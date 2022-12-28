package dev.nikunjgupta.graphql.processor.pojo;

import java.util.List;

public class TypeResolver {
    private String type;
    private List<KeyResolver> keyResolvers;

    public TypeResolver() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<KeyResolver> getKeyResolvers() {
        return keyResolvers;
    }

    public void setKeyResolvers(List<KeyResolver> keyResolvers) {
        this.keyResolvers = keyResolvers;
    }
}