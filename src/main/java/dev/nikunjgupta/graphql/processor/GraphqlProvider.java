package dev.nikunjgupta.graphql.processor;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.datafetcher.MutationRestDataFetcher;
import dev.nikunjgupta.graphql.datafetcher.QueryRestDataFetcher;
import dev.nikunjgupta.graphql.datafetcher.TypeRestDataFetcher;
import dev.nikunjgupta.graphql.processor.pojo.*;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import graphql.schema.visibility.DefaultGraphqlFieldVisibility;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

public class GraphqlProvider {
    private static final Map<String, GraphQL> PROJECTS_GRAPHQL = new HashMap<>();

    public static GraphQL getGraphQLForProject(String projectName){
        if(!PROJECTS_GRAPHQL.containsKey(projectName)){
            try {
                PROJECTS_GRAPHQL.put(projectName, GraphQL.newGraphQL(generateSchemaForProject(projectName)).build());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return PROJECTS_GRAPHQL.get(projectName);
    }

    private static GraphQLSchema generateSchemaForProject(String projectName) throws Exception {
        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeDefinitionRegistry = null;
        try {
            typeDefinitionRegistry = schemaParser.parse(
                    Util.readResourceFile(projectName + "/schema.graphql"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        RestData restData = getRestData(projectName);
        Map<String, Rest> nameToRestMap = createNameToRestMap(restData);
        ResolverData resolverData = getResolverData(projectName);

        RuntimeWiring.Builder runtimeWritingBuilder = newRuntimeWiring();

        runtimeWritingBuilder = runtimeWritingBuilder.type("Query", builder -> {
            for (QueryResolver resolver : resolverData.getQueryResolvers()) {
                builder = builder.dataFetcher(resolver.getQuery(),
                        new QueryRestDataFetcher(nameToRestMap.get(resolver.getResolver().getRestName())));
            }
            return builder;
        });

        runtimeWritingBuilder = runtimeWritingBuilder.type("Mutation", builder -> {
            for (MutationResolver resolver : resolverData.getMutationResolvers()) {
                builder = builder.dataFetcher(resolver.getMutation(),
                        new MutationRestDataFetcher(nameToRestMap.get(resolver.getResolver().getRestName())));
            }
            return builder;
        });

        for (TypeResolver resolver : resolverData.getTypeResolvers()) {
            runtimeWritingBuilder = runtimeWritingBuilder.type(resolver.getType(), builder -> {
                for (KeyResolver keyResolver : resolver.getKeyResolvers()) {
                    builder = builder.dataFetcher(keyResolver.getKey(),
                            new TypeRestDataFetcher(nameToRestMap.get(keyResolver.getRestName())));
                }
                return builder;
            });
        }

        RuntimeWiring runtimeWiring = runtimeWritingBuilder
                .build();

        SchemaGenerator schemaGenerator = new SchemaGenerator();

        return GraphQLSchema.newSchema(schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring))
                .fieldVisibility(DefaultGraphqlFieldVisibility.DEFAULT_FIELD_VISIBILITY)
                .build();
    }

    private static Map<String, Rest> createNameToRestMap(RestData restData) {
        Map<String, Rest> map = new HashMap<>();
        for (Rest rest : restData.getRests()) {
            map.put(rest.getName(), rest);
        }
        return map;
    }

    private static ResolverData getResolverData(String projectName) throws Exception {
        try {
            return Util.jsonToObject(Util.readResourceFile(projectName + "/resolverData.json"), ResolverData.class);
        } catch (Exception e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }

    private static RestData getRestData(String projectName) throws Exception {
        try {
            List<Rest> list = Util.jsonToObject(Util.readResourceFile(projectName + "/restData.json"), new TypeReference<List<Rest>>(){});
            return new RestData(list);
        } catch (Exception e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }
}
