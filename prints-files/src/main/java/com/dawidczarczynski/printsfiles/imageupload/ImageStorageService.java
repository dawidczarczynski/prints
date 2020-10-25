package com.dawidczarczynski.printsfiles.imageupload;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    void storeImageFile(MultipartFile file);
}
