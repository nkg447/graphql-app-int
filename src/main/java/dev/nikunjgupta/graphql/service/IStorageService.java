package dev.nikunjgupta.graphql.service;

import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;

public interface IStorageService {

    void saveFiles(String projectId, SaveFilesRequest request) throws Exception;

    SaveFilesRequest getFiles(String projectId) throws Exception;
}
