package dev.nikunjgupta.graphql.controller;

import dev.nikunjgupta.graphql.pojo.SaveFilesRequest;
import dev.nikunjgupta.graphql.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class UiController {

    @Autowired
    private IStorageService storageService;

    @RequestMapping(value = "/{projectId}/storage", method = POST)
    @ResponseBody
    public ResponseEntity saveFiles(@PathVariable String projectId, @RequestBody SaveFilesRequest request) throws Exception {
        storageService.saveFiles(projectId, request);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }
}
