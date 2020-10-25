package com.dawidczarczynski.printsfiles.imageupload.impl;

import com.dawidczarczynski.printsfiles.exceptions.ImageSavingException;
import com.dawidczarczynski.printsfiles.imageupload.FileConverter;
import com.dawidczarczynski.printsfiles.imageupload.ImageStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.File;
import java.io.IOException;

@Service
@Slf4j
class S3StorageServiceImpl implements ImageStorageService {

    private final S3Client s3Client;
    private final String awsS3ImagesBucket;
    private final FileConverter converter;

    public S3StorageServiceImpl(
            Region awsRegion,
            StaticCredentialsProvider awsCredentialsProvider,
            String awsS3ImagesBucket,
            FileConverter converter
    ) {
        this.awsS3ImagesBucket = awsS3ImagesBucket;
        this.converter = converter;
        this.s3Client = S3Client.builder()
                .region(awsRegion)
                .credentialsProvider(awsCredentialsProvider)
                .build();
    }

    @Override
    public void storeImageFile(MultipartFile file) {
        try {
            File convertedFile = converter.multipartToFile(file);
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(awsS3ImagesBucket)
                    .key(convertedFile.getName())
                    .build();

            s3Client.putObject(request, RequestBody.fromFile(convertedFile));
            log.info(convertedFile.getName() + " saved successfully");
        } catch (IOException exception) {
            log.error("Error when converting multipart file");
            exception.printStackTrace();

            throw new ImageSavingException();
        } catch (S3Exception exception) {
            log.error("Error when putting object to S3 bucket");
            exception.printStackTrace();

            throw new ImageSavingException();
        }
    }

}
