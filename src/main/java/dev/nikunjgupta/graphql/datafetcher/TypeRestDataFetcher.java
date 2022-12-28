package dev.nikunjgupta.graphql.datafetcher;

import dev.nikunjgupta.graphql.processor.pojo.Rest;
import graphql.schema.DataFetchingEnvironment;

public class TypeRestDataFetcher extends AbstractRestDataFetcher{

    public TypeRestDataFetcher(Rest rest) {
        super(rest);
    }

    @Override
    protected Object getDataModelForRestEndpoint(DataFetchingEnvironment environment) {
        return environment.getSource();
    }

    @Override
    public Object getDataModelForRequestBody(DataFetchingEnvironment environment) {
        return environment.getSource();
    }
}
