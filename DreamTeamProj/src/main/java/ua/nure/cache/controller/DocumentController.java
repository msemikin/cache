package ua.nure.cache.controller;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.cache.service.DocumentService;

import java.io.IOException;

/**
 * Created by maxim on 07.01.16.
 */
@RestController
@RequestMapping(value = "/document")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(final DocumentService documentService) {
        this.documentService = documentService;
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public void generateDocument() {
        documentService.generateDocument();
    }
}
