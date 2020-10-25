package com.dawidczarczynski.printsfiles.controller;

import com.dawidczarczynski.printsfiles.imageupload.ImageStorageService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageUploadController {

    private final ImageStorageService imageStorageService;

    public ImageUploadController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/image")
    public ResponseEntity<String> handleImageUpload(@RequestParam("file") MultipartFile imageFile) {
        imageStorageService.storeImageFile(imageFile);
        return new ResponseEntity<>("Image file saved successfully", HttpStatus.CREATED);
    }

}
