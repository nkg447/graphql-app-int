package dev.nikunjgupta.graphql.processor.pojo;


public class MutationResolver {
    private String mutation;
    private Resolver resolver;

    public MutationResolver() {
    }

    public String getMutation() {
        return mutation;
    }

    public void setMutation(String mutation) {
        this.mutation = mutation;
    }

    public Resolver getResolver() {
        return resolver;
    }

    public void setResolver(Resolver resolver) {
        this.resolver = resolver;
    }
}