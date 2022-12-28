package dev.nikunjgupta.graphql.datafetcher;

import dev.nikunjgupta.graphql.processor.pojo.Rest;
import freemarker.template.TemplateException;
import graphql.language.FieldDefinition;
import graphql.language.ListType;
import graphql.language.NonNullType;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

public abstract class AbstractRestDataFetcher implements DataFetcher<Object> {
    private static final RestTemplate REST_TEMPLATE = new RestTemplate();

    private final Rest rest;
    private Boolean isArrayResponse = null;

    public AbstractRestDataFetcher(Rest rest) {
        this.rest = rest;
    }

    @Override
    public Object get(DataFetchingEnvironment environment) throws Exception {

        String resourceUrl = getRequestEndpoint(environment);

        Class type = Map.class;
        if (isArrayTypeField(environment)) {
            type = Map[].class;
        }

        HttpEntity<Object> request = new HttpEntity<>(getRequestBody(environment), rest.getHeaders());

        ResponseEntity response = REST_TEMPLATE
                .exchange(resourceUrl, rest.getMethod(), request, type);

        return response.getBody();
    }

    protected boolean isArrayTypeField(DataFetchingEnvironment environment) {
        if (isArrayResponse == null) {
            FieldDefinition definition = environment.getFieldDefinition().getDefinition();
            isArrayResponse = Boolean.FALSE;
            if (definition.getType() instanceof ListType) {
                isArrayResponse = Boolean.TRUE;
            }
            if (definition.getType() instanceof NonNullType) {
                NonNullType type = (NonNullType) definition.getType();
                if (type.getType() instanceof ListType) {
                    isArrayResponse = Boolean.TRUE;
                }
            }
        }
        return isArrayResponse.booleanValue();
    }

    protected String getRequestEndpoint(DataFetchingEnvironment environment) throws Exception {
        try {
            try (StringWriter out = new StringWriter()) {
                rest.getEndpointTemplate().process(getDataModelForRestEndpoint(environment), out);
                String output = out.getBuffer().toString();
                out.flush();
                return output;
            }
        } catch (IOException | TemplateException e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }

    protected abstract Object getDataModelForRestEndpoint(DataFetchingEnvironment environment);

    protected Object getRequestBody(DataFetchingEnvironment environment) throws Exception {
        if (rest.getRequestBodyTemplate() == null) {
            return environment.getArgument("input");
        }
        try (StringWriter out = new StringWriter()) {
            rest.getRequestBodyTemplate().process(getDataModelForRequestBody(environment), out);
            String output = out.getBuffer().toString();
            out.flush();
            return output;
        } catch (TemplateException e) {
            throw new Exception(e.getLocalizedMessage());
        }
    }

    public Object getDataModelForRequestBody(DataFetchingEnvironment environment) {
        return environment.getArguments();
    }

    public Rest getRest() {
        return rest;
    }
}
