package ua.nure.cache.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class UIController {
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/upload",method= RequestMethod.POST)
    public void upload(@RequestParam("file") MultipartFile file) throws IOException {

        byte[] bytes;
        if (!file.isEmpty()) {
            bytes = file.getBytes();
        }

        System.out.println(String.format("receive %s from %s", file.getOriginalFilename()));
    }
}
