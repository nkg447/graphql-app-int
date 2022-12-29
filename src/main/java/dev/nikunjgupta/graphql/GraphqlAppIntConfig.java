package dev.nikunjgupta.graphql;

import dev.nikunjgupta.graphql.storage.GcpStorage;
import dev.nikunjgupta.graphql.storage.IStorage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class GraphqlAppIntConfig {

    @Value( "${gcp.project.id}" )
    private String gcpProjectId;

    @Value( "${gcp.bucket.name}" )
    private String gcpBucketName;

    @Value( "${gcp.secret.json.file}" )
    private String gcpSecretJsonFile;

    @Bean
    IStorage getStorage() throws IOException {
        return new GcpStorage();
    }

    public String getGcpProjectId() {
        return gcpProjectId;
    }

    public String getGcpBucketName() {
        return gcpBucketName;
    }

    public String getGcpSecretJsonFile() {
        return gcpSecretJsonFile;
    }
}