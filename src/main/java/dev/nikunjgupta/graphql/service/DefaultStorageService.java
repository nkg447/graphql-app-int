package dev.nikunjgupta.graphql.service;

import dev.nikunjgupta.graphql.Util;
import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;
import dev.nikunjgupta.graphql.storage.IStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefaultStorageService implements IStorageService {

    @Autowired
    private IStorage storage;

    @Override
    public void saveFiles(String projectId, SaveFilesRequest request) {
        if (Util.notNullOrEmpty(request.getSchema()))
            storage.setSchema(projectId, request.getSchema());
        if (Util.notNullOrEmpty(request.getRestMappings()))
            storage.setRestMappings(projectId, request.getRestMappings());
        if (Util.notNullOrEmpty(request.getResolverMappings()))
            storage.setResolverMappings(projectId, request.getResolverMappings());
    }
}
