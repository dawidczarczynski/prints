package com.dawidczarczynski.printsfiles.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    void storeImageFile(MultipartFile file);
}
