package com.dawidczarczynski.printsfiles.upload.impl;

import com.dawidczarczynski.printsfiles.upload.ImageSavingException;
import com.dawidczarczynski.printsfiles.upload.ImageBucketClient;
import com.dawidczarczynski.printsfiles.upload.ImageStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
class ImageStorageServiceImpl implements ImageStorageService {

    private final ImageBucketClient bucketClient;

    public ImageStorageServiceImpl(ImageBucketClient bucketClient) {
        this.bucketClient = bucketClient;
    }

    @Override
    public void storeImageFile(MultipartFile file) {
        try {
            bucketClient.uploadImage(file);
            log.info("{} file saved", file.getOriginalFilename());
        } catch (ImageSavingException exception) {
            log.error("{} file saving failed", file.getOriginalFilename(), exception);
            throw exception;
        }
    }

}
