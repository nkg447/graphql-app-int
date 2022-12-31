package dev.nikunjgupta.graphql.generator;

import com.fasterxml.jackson.core.JsonProcessingException;
import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.processor.pojo.Rest;
import dev.nikunjgupta.graphql.processor.pojo.RestMappings;
import dev.nikunjgupta.provider.NameProvider;
import io.swagger.parser.OpenAPIParser;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.parser.core.models.SwaggerParseResult;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RestMappingGenerator {

    private final OpenAPI openAPI;
    private final NameProvider nameProvider;

    public RestMappingGenerator(OpenAPI openAPI) {
        this.openAPI = openAPI;
        this.nameProvider = new NameProvider();

    }

    public static void main(String[] args) throws JsonProcessingException {
//        String url = "https://raw.githubusercontent.com/typicode/jsonplaceholder/31e6581ba012d27fd480b052b44001d09e21fdfa/public/swagger.json";

        String url = "https://petstore.swagger.io/v2/swagger.json";
//        String url = "https://raw.githubusercontent.com/logzio/public-api/master/alerts/swagger" +
//                ".json";
        RestMappings restMappings = generateRestMappings(url);
        System.out.println(Util.objectToJson(restMappings));
    }

    public static RestMappings generateRestMappings(String openApiUri) {
        SwaggerParseResult result = new OpenAPIParser().readLocation(openApiUri, null, null);
        OpenAPI openAPI = result.getOpenAPI();
        return new RestMappingGenerator(openAPI).getRestMappings();
    }

    private RestMappings getRestMappings() {
        RestMappings restMappings = new RestMappings();
        List<Rest> rests = new ArrayList<>();
        for (Map.Entry<String, PathItem> entry : openAPI.getPaths().entrySet()) {
            String path = entry.getKey();
            PathItem pathItem = entry.getValue();
            rests.addAll(pathItemToRests(pathItem, path));
        }
        restMappings.setRests(rests);
        return restMappings;
    }

    private List<Rest> pathItemToRests(PathItem pathItem, String path) {
        List<Rest> rests = new ArrayList<>();
        Operation operation = null;
        String method = "";

        if ((pathItem.getGet() != null && (method = "get") != null && (operation =
                pathItem.getGet()) != null)) {
            rests.add(operationToRest(path, operation, method));
        }
        if ((pathItem.getPost() != null && (method = "post") != null && (operation =
                pathItem.getPost()) != null)) {
            rests.add(operationToRest(path, operation, method));
        }
        if ((pathItem.getPut() != null && (method = "put") != null && (operation =
                pathItem.getPut()) != null)) {
            rests.add(operationToRest(path, operation, method));
        }
        if ((pathItem.getPatch() != null && (method = "patch") != null && (operation =
                pathItem.getPatch()) != null)) {
            rests.add(operationToRest(path, operation, method));
        }

        return rests;
    }

    private Rest operationToRest(String path, Operation operation, String method) {
        Rest rest = new Rest();
        rest.setName(nameProvider.getOperationName(operation, path, method));
        rest.setEndpoint(getBaseUrl() + getTemplateReadyPath(path));
        rest.setQueryParams(getQueryParams(operation));
        rest.setMethod(HttpMethod.resolve(method.toUpperCase()));
        return rest;
    }

    private String getTemplateReadyPath(String path) {
        return path.replace("/{", "/${");
    }

    private List<String> getQueryParams(Operation operation) {
        List<String> queryParams = new ArrayList<>();
        for (Parameter parameter : operation.getParameters()) {
            queryParams.add(parameter.getName());
        }
        return queryParams;
    }

    private String getBaseUrl() {
        return openAPI.getServers().get(0).getUrl();
    }
}
