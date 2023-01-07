package dev.nikunjgupta.graphql.service;

import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.generator.ResolverMappingGenerator;
import dev.nikunjgupta.graphql.generator.RestMappingGenerator;
import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;
import dev.nikunjgupta.graphql.processor.IGraphqlProvider;
import dev.nikunjgupta.graphql.processor.pojo.ResolverMappings;
import dev.nikunjgupta.graphql.processor.pojo.RestMappings;
import dev.nikunjgupta.graphql.storage.IStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefaultStorageService implements IStorageService {

    @Autowired
    private IStorage storage;
    @Autowired
    private IGraphqlProvider graphqlProvider;

    @Override
    public void saveFiles(String projectId, SaveFilesRequest request) throws Exception {
        if (Util.notNullOrEmpty(request.getSchema()))
            storage.setSchema(projectId, request.getSchema());
        if (Util.notNullOrEmpty(request.getRestMappings()))
            storage.setRestMappings(projectId, request.getRestMappings());
        if (Util.notNullOrEmpty(request.getResolverMappings()))
            storage.setResolverMappings(projectId, request.getResolverMappings());
        graphqlProvider.reset(projectId);
    }

    @Override
    public SaveFilesRequest getFiles(String projectId) throws Exception {
        SaveFilesRequest saveFilesRequest = new SaveFilesRequest();
        saveFilesRequest.setSchema(new String(storage.getSchema(projectId)));
        saveFilesRequest.setRestMappings(new String(storage.getRestMappings(projectId)));
        saveFilesRequest.setResolverMappings(new String(storage.getResolverMappings(projectId)));
        return saveFilesRequest;
    }
}
