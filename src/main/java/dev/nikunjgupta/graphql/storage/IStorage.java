package dev.nikunjgupta.graphql.storage;


public interface IStorage {
    void setSchema(String projectId, String gqlSchemaInputStream);

    void setRestMappings(String projectId, String restMappingsInputStream);

    void setResolverMappings(String projectId, String resolverMappingsInputStream);

    byte[] getSchema(String projectId);

    byte[] getRestMappings(String projectId);

    byte[] getResolverMappings(String projectId);
}
