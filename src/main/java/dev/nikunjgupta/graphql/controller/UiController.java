package dev.nikunjgupta.graphql.controller;

import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;
import dev.nikunjgupta.graphql.service.IGeneratorService;
import dev.nikunjgupta.graphql.service.IStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequiredArgsConstructor
public class UiController {

    private final IStorageService storageService;
    private final IGeneratorService generatorService;

    @PostMapping(value = "/{projectId}/storage")
    @ResponseBody
    public ResponseEntity<Void> saveFiles(@PathVariable String projectId,
                                    @RequestBody SaveFilesRequest request) throws Exception {
        storageService.saveFiles(projectId, request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping (value = "/{projectId}/schema")
    @ResponseBody
    public ResponseEntity<SaveFilesRequest> getSchema(@PathVariable String projectId,
                                                      @RequestParam String url) throws Exception {
        SaveFilesRequest request=null;
        if(url!=null && !url.isEmpty()){
            request = generatorService.generateDefaultSaveFilesRequest(url);
            storageService.saveFiles(projectId, request);
        }else{
            request = storageService.getFiles(projectId);
        }
        return new ResponseEntity<>(request, HttpStatus.ACCEPTED);
    }
}
