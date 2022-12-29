package dev.nikunjgupta.graphql.processor;

import graphql.GraphQL;

public interface IGraphqlProvider {
    GraphQL getGraphQLForProject(String projectName);
}
