package dev.nikunjgupta.graphql.pojo;

public class SaveFilesRequest {
    private String schema;
    private String restMappings;
    private String resolverMappings;

    public SaveFilesRequest() {
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
    }

    public String getRestMappings() {
        return restMappings;
    }

    public void setRestMappings(String restMappings) {
        this.restMappings = restMappings;
    }

    public String getResolverMappings() {
        return resolverMappings;
    }

    public void setResolverMappings(String resolverMappings) {
        this.resolverMappings = resolverMappings;
    }
}
