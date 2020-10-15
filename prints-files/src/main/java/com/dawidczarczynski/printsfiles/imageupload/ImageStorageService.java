package com.dawidczarczynski.printsfiles.imageupload;

import org.springframework.web.multipart.MultipartFile;

interface ImageStorageService {
    void storeImageFile(MultipartFile file);
}
