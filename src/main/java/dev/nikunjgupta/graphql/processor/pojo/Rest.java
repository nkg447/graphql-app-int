package dev.nikunjgupta.graphql.processor.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.nikunjgupta.graphql.Util;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.io.IOException;
import java.io.StringReader;
import java.util.Map;

public class Rest {
    private String name;
    private String endpoint;
    private HttpMethod method;
    private HttpHeaders headers = new HttpHeaders();
    private String requestBody;
    @JsonIgnore
    private Template endpointTemplate;
    @JsonIgnore
    private Template requestBodyTemplate;

    public Rest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public HttpMethod getMethod() {
        return method;
    }

    public void setMethod(HttpMethod method) {
        this.method = method;
    }

    public Template getEndpointTemplate() throws IOException {
        if (endpointTemplate == null) {
            endpointTemplate = new Template(getName(), new StringReader(this.endpoint),
                    new Configuration());
        }
        return endpointTemplate;
    }

    public Template getRequestBodyTemplate() throws IOException {
        if (!Util.notNullOrEmpty(this.requestBody)) {
            return null;
        }
        if (requestBodyTemplate == null) {
            requestBodyTemplate = new Template(getName(), new StringReader(this.requestBody),
                    new Configuration());
        }
        return requestBodyTemplate;
    }

    public HttpHeaders getHeaders() {
        return headers;
    }

    public void setHeaders(Map<String, String> headers) {
        this.headers = new HttpHeaders();
        for (Map.Entry<String, String> entry : headers.entrySet()) {
            this.headers.add(entry.getKey(), entry.getValue());
        }
    }

    public void setRequestBody(String requestBody) {
        this.requestBody = requestBody;
    }
}
