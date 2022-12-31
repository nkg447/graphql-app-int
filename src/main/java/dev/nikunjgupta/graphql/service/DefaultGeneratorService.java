package dev.nikunjgupta.graphql.service;

import dev.nikunjgupta.OpenApiToGraphQlSchema;
import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.generator.ResolverMappingGenerator;
import dev.nikunjgupta.graphql.generator.RestMappingGenerator;
import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;
import dev.nikunjgupta.graphql.processor.pojo.ResolverMappings;
import dev.nikunjgupta.graphql.processor.pojo.RestMappings;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.SchemaPrinter;
import org.springframework.stereotype.Service;

@Service
public class DefaultGeneratorService implements IGeneratorService {

    public SaveFilesRequest generateDefaultSaveFilesRequest(String openApiUri) throws Exception {
        SaveFilesRequest saveFilesRequest = new SaveFilesRequest();
        saveFilesRequest.setSchema(getGraphQlSchema(openApiUri));
        RestMappings restMappings = RestMappingGenerator.generateRestMappings(openApiUri);
        saveFilesRequest.setRestMappings(Util.objectToJson(restMappings.getRests()));
        ResolverMappings resolverMappings =
                ResolverMappingGenerator.generateResolverMappings(restMappings);
        saveFilesRequest.setResolverMappings(Util.objectToJson(resolverMappings));
        return saveFilesRequest;
    }

    public String getGraphQlSchema(String openApiUri) {
        GraphQLSchema graphQLSchema = OpenApiToGraphQlSchema.generateGraphQlSchema(openApiUri);
        SchemaPrinter schemaPrinter = new SchemaPrinter();
        return schemaPrinter.print(graphQLSchema);
    }
}
