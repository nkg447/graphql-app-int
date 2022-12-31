package dev.nikunjgupta.graphql.processor.pojo;

public class Resolver {
    private String restName;

    public Resolver() {
    }

    public Resolver(String restName) {
        this.restName = restName;
    }

    public String getRestName() {
        return restName;
    }

    public void setRestName(String restName) {
        this.restName = restName;
    }
}