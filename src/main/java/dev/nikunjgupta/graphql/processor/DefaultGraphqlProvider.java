package dev.nikunjgupta.graphql.processor;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.datafetcher.MutationRestDataFetcher;
import dev.nikunjgupta.graphql.datafetcher.QueryRestDataFetcher;
import dev.nikunjgupta.graphql.datafetcher.TypeRestDataFetcher;
import dev.nikunjgupta.graphql.processor.pojo.*;
import dev.nikunjgupta.graphql.storage.IStorage;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import graphql.schema.visibility.DefaultGraphqlFieldVisibility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

@Component
public class DefaultGraphqlProvider implements IGraphqlProvider {
    private static final Map<String, GraphQL> PROJECTS_GRAPHQL = new HashMap<>();

    @Autowired
    private IStorage storage;

    @Override
    public GraphQL getGraphQLForProject(String projectId) {
        if (!PROJECTS_GRAPHQL.containsKey(projectId)) {
            try {
                PROJECTS_GRAPHQL.put(projectId, GraphQL.newGraphQL(generateSchemaForProject(projectId)).build());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return PROJECTS_GRAPHQL.get(projectId);
    }

    private GraphQLSchema generateSchemaForProject(String projectId) throws Exception {
        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeDefinitionRegistry = schemaParser.parse(new String(storage.getSchema(projectId)));

        RestData restData = getRestData(projectId);
        Map<String, Rest> nameToRestMap = createNameToRestMap(restData);
        ResolverData resolverData = getResolverData(projectId);

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

    private Map<String, Rest> createNameToRestMap(RestData restData) {
        Map<String, Rest> map = new HashMap<>();
        for (Rest rest : restData.getRests()) {
            map.put(rest.getName(), rest);
        }
        return map;
    }

    private ResolverData getResolverData(String projectId) throws Exception {
        try {
            return Util.jsonToObject(new String(storage.getResolverMappings(projectId)), ResolverData.class);
        } catch (Exception e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }

    private RestData getRestData(String projectId) throws Exception {
        try {
            List<Rest> list = Util.jsonToObject(
                    new String(storage.getRestMappings(projectId)),
                    new TypeReference<List<Rest>>() {
                    });
            return new RestData(list);
        } catch (Exception e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }
}
