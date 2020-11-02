package com.dawidczarczynski.printsfiles.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageBucketClient {
    void uploadImage(MultipartFile image);
}
