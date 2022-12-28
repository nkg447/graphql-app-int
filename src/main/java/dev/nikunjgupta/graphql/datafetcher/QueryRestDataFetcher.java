package dev.nikunjgupta.graphql.datafetcher;

import dev.nikunjgupta.graphql.processor.pojo.Rest;
import graphql.schema.DataFetchingEnvironment;

public class QueryRestDataFetcher extends AbstractRestDataFetcher{

    public QueryRestDataFetcher(Rest rest) {
        super(rest);
    }

    @Override
    protected Object getDataModelForRestEndpoint(DataFetchingEnvironment environment) {
        return environment.getArguments();
    }

}
