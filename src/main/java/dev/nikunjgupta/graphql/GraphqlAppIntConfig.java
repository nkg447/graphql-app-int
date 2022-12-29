package dev.nikunjgupta.graphql;

import dev.nikunjgupta.graphql.storage.FileStorage;
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

    @Value( "${storage.provider}" )
    private String storageProvider;

    @Bean
    IStorage getStorage() {
        if("gcp".equalsIgnoreCase(storageProvider))
            return new GcpStorage();
        return new FileStorage();
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