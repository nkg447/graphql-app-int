package dev.nikunjgupta.graphql.processor.pojo;

public class KeyResolver extends Resolver {
    private String key;

    public KeyResolver() {
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

}