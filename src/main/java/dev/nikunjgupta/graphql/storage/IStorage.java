package dev.nikunjgupta.graphql.storage;


public interface IStorage {
    void setSchema(String projectId, String gqlSchemaInputStream) throws Exception;

    void setRestMappings(String projectId, String restMappingsInputStream) throws Exception;

    void setResolverMappings(String projectId, String resolverMappingsInputStream) throws Exception;

    byte[] getSchema(String projectId) throws Exception;

    byte[] getRestMappings(String projectId) throws Exception;

    byte[] getResolverMappings(String projectId) throws Exception;
}
