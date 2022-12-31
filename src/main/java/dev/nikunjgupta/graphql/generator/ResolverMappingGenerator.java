package dev.nikunjgupta.graphql.generator;

import dev.nikunjgupta.graphql.processor.pojo.*;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;

public class ResolverMappingGenerator {

    public static ResolverMappings generateResolverMappings(RestMappings restMappings) {
        ResolverMappings resolverMappings = new ResolverMappings();
        List<QueryResolver> queryResolvers = new ArrayList<>();
        List<MutationResolver> mutationResolvers = new ArrayList<>();
        List<TypeResolver> typeResolvers = new ArrayList<>();
        for (Rest rest : restMappings.getRests()) {
            if (rest.getMethod() == HttpMethod.GET) {
                QueryResolver queryResolver = new QueryResolver();
                queryResolver.setQuery(rest.getName());
                queryResolver.setResolver(new Resolver(rest.getName()));
                queryResolvers.add(queryResolver);
            } else {
                MutationResolver mutationResolver = new MutationResolver();
                mutationResolver.setMutation(rest.getName());
                mutationResolver.setResolver(new Resolver(rest.getName()));
                mutationResolvers.add(mutationResolver);
            }
        }
        resolverMappings.setMutationResolvers(mutationResolvers);
        resolverMappings.setQueryResolvers(queryResolvers);
        resolverMappings.setTypeResolvers(typeResolvers);

        return resolverMappings;
    }
}
