package dev.nikunjgupta.graphql.processor.pojo;

public class QueryResolver {
    private String query;
    private Resolver resolver;

    public QueryResolver() {
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Resolver getResolver() {
        return resolver;
    }

    public void setResolver(Resolver resolver) {
        this.resolver = resolver;
    }
}