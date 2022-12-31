package dev.nikunjgupta.graphql.processor.pojo;

import java.util.List;

public class ResolverMappings {
    private List<QueryResolver> queryResolvers;
    private List<MutationResolver> mutationResolvers;
    private List<TypeResolver> typeResolvers;

    public ResolverMappings() {
    }

    public List<QueryResolver> getQueryResolvers() {
        return queryResolvers;
    }

    public void setQueryResolvers(List<QueryResolver> queryResolvers) {
        this.queryResolvers = queryResolvers;
    }

    public List<MutationResolver> getMutationResolvers() {
        return mutationResolvers;
    }

    public void setMutationResolvers(List<MutationResolver> mutationResolvers) {
        this.mutationResolvers = mutationResolvers;
    }

    public List<TypeResolver> getTypeResolvers() {
        return typeResolvers;
    }

    public void setTypeResolvers(List<TypeResolver> typeResolvers) {
        this.typeResolvers = typeResolvers;
    }
}
