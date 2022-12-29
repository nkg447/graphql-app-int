package dev.nikunjgupta.graphql.storage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;

public class FileStorage implements IStorage {

    private void createOrUpdateFile(String filePath, String data) throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            Files.createDirectories(file.toPath().getParent());
            file.createNewFile();
        }
        Files.write(file.toPath(), data.getBytes(), StandardOpenOption.TRUNCATE_EXISTING);
    }

    @Override
    public void setSchema(String projectId, String gqlSchemaInputStream) throws Exception {
        createOrUpdateFile(pathToSchema(projectId), gqlSchemaInputStream);
    }

    @Override
    public void setRestMappings(String projectId, String restMappingsInputStream) throws Exception {
        createOrUpdateFile(pathToRestMappings(projectId), restMappingsInputStream);
    }

    @Override
    public void setResolverMappings(String projectId, String resolverMappingsInputStream) throws Exception {
        createOrUpdateFile(pathToResolverMappings(projectId), resolverMappingsInputStream);
    }

    @Override
    public byte[] getSchema(String projectId) throws Exception {
        return Files.readAllBytes(new File(pathToSchema(projectId)).toPath());
    }

    @Override
    public byte[] getRestMappings(String projectId) throws Exception {
        return Files.readAllBytes(new File(pathToRestMappings(projectId)).toPath());
    }

    @Override
    public byte[] getResolverMappings(String projectId) throws Exception {
        return Files.readAllBytes(new File(pathToResolverMappings(projectId)).toPath());
    }

    private String pathToSchema(String projectId) {
        return basePath() + projectId + "/schema.graphql";
    }

    private String pathToRestMappings(String projectId) {
        return basePath() + projectId + "/restMappings.json";
    }

    private String pathToResolverMappings(String projectId) {
        return basePath() + projectId + "/resolverMappings.json";
    }

    private String basePath() {
        return this.getClass().getClassLoader().getResource("").getFile();
    }
}
