package com.dawidczarczynski.printsfiles.upload;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageUploadController {

    private final ImageStorageService imageStorageService;

    public ImageUploadController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    @PostMapping("/image")
    public ResponseEntity<String> handleImageUpload(@RequestParam("file") MultipartFile imageFile) {
        imageStorageService.storeImageFile(imageFile);
        return new ResponseEntity<>("Image file saved successfully", HttpStatus.CREATED);
    }

}
