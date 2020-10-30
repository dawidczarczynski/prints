package com.dawidczarczynski.printsfiles.service.impl;

import com.dawidczarczynski.printsfiles.exceptions.ImageSavingException;
import com.dawidczarczynski.printsfiles.service.ImageStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.BufferedInputStream;
import java.io.IOException;

@Service
@Slf4j
class S3StorageServiceImpl implements ImageStorageService {

    private final S3Client s3Client;
    private final String awsS3ImagesBucket;

    public S3StorageServiceImpl(
            Region awsRegion,
            StaticCredentialsProvider awsCredentialsProvider,
            String awsS3ImagesBucket
    ) {
        this.awsS3ImagesBucket = awsS3ImagesBucket;
        this.s3Client = S3Client.builder()
                .region(awsRegion)
                .credentialsProvider(awsCredentialsProvider)
                .build();
    }

    @Override
    public void storeImageFile(MultipartFile file) {
        try {
            PutObjectRequest request = getS3Request(file.getOriginalFilename());
            RequestBody requestBody = getS3RequestBody(file);
            s3Client.putObject(request, requestBody);

            log.info(file.getName() + " saved successfully");
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

    private PutObjectRequest getS3Request(String fileName) {
        return PutObjectRequest.builder()
                .bucket(awsS3ImagesBucket)
                .key(fileName)
                .build();
    }

    private RequestBody getS3RequestBody(MultipartFile file) throws IOException {
        return RequestBody.fromInputStream(
                new BufferedInputStream(file.getInputStream()),
                file.getSize()
        );
    }

}
