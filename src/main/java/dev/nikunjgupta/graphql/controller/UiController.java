package dev.nikunjgupta.graphql.controller;

import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;
import dev.nikunjgupta.graphql.service.IGeneratorService;
import dev.nikunjgupta.graphql.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class UiController {

    @Autowired
    private IStorageService storageService;
    @Autowired
    private IGeneratorService generatorService;

    @RequestMapping(value = "/{projectId}/storage", method = POST)
    @ResponseBody
    public ResponseEntity saveFiles(@PathVariable String projectId,
                                    @RequestBody SaveFilesRequest request) throws Exception {
        storageService.saveFiles(projectId, request);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/{projectId}/schema", method = GET)
    @ResponseBody
    public ResponseEntity<SaveFilesRequest> getSchema(@PathVariable String projectId,
                                                      @RequestParam String url) throws Exception {
        SaveFilesRequest request = generatorService.generateDefaultSaveFilesRequest(url);
        storageService.saveFiles(projectId, request);
        return new ResponseEntity<>(request, HttpStatus.ACCEPTED);
    }
}
