package dev.nikunjgupta.graphql.storage;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import dev.nikunjgupta.graphql.GraphqlAppIntConfig;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.FileInputStream;
import java.io.IOException;


public class GcpStorage implements IStorage {

    @Autowired
    private GraphqlAppIntConfig config;

    private Storage storage;

    public GcpStorage() {

    }

    private Storage getStorage() {
        if (storage == null) {
            try {
                this.storage = StorageOptions.newBuilder()
                        .setProjectId(config.getGcpProjectId())
                        .setCredentials(getCredentials())
                        .build().getService();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return this.storage;
    }

    private Credentials getCredentials() throws IOException {
        return GoogleCredentials.fromStream(
                new FileInputStream(config.getGcpSecretJsonFile()));
    }

    private void createOrUpdateObject(String objectPath, byte[] dataBytes) {
        BlobId blobId = BlobId.of(config.getGcpBucketName(), objectPath);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        getStorage().create(blobInfo, dataBytes);
    }

    private byte[] getObject(String objectPath) {
        return getStorage().get(config.getGcpBucketName(), objectPath).getContent();
    }

    private String pathToSchema(String projectId) {
        return baseUrl() + projectId + "/schema.graphql";
    }

    private String pathToRestMappings(String projectId) {
        return baseUrl() + projectId + "/restMappings.json";
    }

    private String pathToResolverMappings(String projectId) {
        return baseUrl() + projectId + "/resolverMappings.json";
    }


    @Override
    public void setSchema(String projectId, String gqlSchema) {
        createOrUpdateObject(pathToSchema(projectId), gqlSchema.getBytes());
    }

    @Override
    public void setRestMappings(String projectId, String restMappings) {
        createOrUpdateObject(pathToRestMappings(projectId), restMappings.getBytes());
    }

    @Override
    public void setResolverMappings(String projectId, String resolverMappings) {
        createOrUpdateObject(pathToResolverMappings(projectId), resolverMappings.getBytes());
    }

    @Override
    public byte[] getSchema(String projectId) {
        return getObject(pathToSchema(projectId));
    }

    @Override
    public byte[] getRestMappings(String projectId) {
        return getObject(pathToRestMappings(projectId));
    }

    @Override
    public byte[] getResolverMappings(String projectId) {
        return getObject(pathToResolverMappings(projectId));
    }

    private String baseUrl() {
        return "projectData/";
    }
}
