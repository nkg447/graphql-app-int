package dev.nikunjgupta.graphql.service;

import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;

public interface IStorageService {

    void saveFiles(String projectId, SaveFilesRequest request);
}
