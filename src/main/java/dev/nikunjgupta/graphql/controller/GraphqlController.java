package dev.nikunjgupta.graphql.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.processor.IGraphqlProvider;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@CrossOrigin(origins = "*")
public class GraphqlController {

    @Autowired
    private IGraphqlProvider graphqlProvider;

    @RequestMapping(value = "/{projectId}/graphql", method = POST)
    @ResponseBody
    public ResponseEntity<Map> getData(@PathVariable String projectId, @RequestBody Map<String, Object> request) throws JsonProcessingException {
        try {
            GraphQL graphQL = graphqlProvider.getGraphQLForProject(projectId);
            ExecutionInput input = getExecutionInput(request);
            ExecutionResult executionResult = graphQL.execute(input);
            if (!executionResult.getErrors().isEmpty()) {
                throw new Exception(executionResult.getErrors().toString());
            }
            return new ResponseEntity<>(executionResult.getData(), null, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(Collections.singletonMap("error", e.getLocalizedMessage()), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ExecutionInput getExecutionInput(Map<String, Object> request) {
        String query = request.getOrDefault("query", "").toString();
        String operationName = request.getOrDefault("operationName", "").toString();
        Map<String, Object> variables = (Map<String, Object>) request.get("variables");
        ExecutionInput.Builder inputBuilder = ExecutionInput.newExecutionInput();

        if (Util.notNullOrEmpty(query))
            inputBuilder = inputBuilder.query(query);

        if (Util.notNullOrEmpty(operationName))
            inputBuilder = inputBuilder.operationName(operationName);

        if (variables != null)
            inputBuilder = inputBuilder.variables(variables);

        return inputBuilder.build();
    }
}
