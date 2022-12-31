package dev.nikunjgupta.graphql.service;

import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;

public interface IGeneratorService {
    SaveFilesRequest generateDefaultSaveFilesRequest(String openApiUri) throws Exception;
}
