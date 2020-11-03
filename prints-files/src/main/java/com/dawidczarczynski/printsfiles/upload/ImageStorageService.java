package com.dawidczarczynski.printsfiles.upload;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    void storeImageFile(MultipartFile file);
}
