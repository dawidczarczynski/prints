package com.dawidczarczynski.printsfiles.upload;

import org.springframework.web.multipart.MultipartFile;

public interface ImageBucketClient {
    void uploadImage(MultipartFile image);
}
