package com.dawidczarczynski.printsfiles.s3;

import com.dawidczarczynski.printsfiles.exceptions.ImageSavingException;
import com.dawidczarczynski.printsfiles.service.ImageBucketClient;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.BufferedInputStream;
import java.io.IOException;

@Component
public class AmazonS3BucketClient implements ImageBucketClient {

    private final S3Client client;
    private final String bucketName;

    public AmazonS3BucketClient(Region awsRegion, StaticCredentialsProvider awsCredentialsProvider, String awsS3ImagesBucket) {
        this.bucketName = awsS3ImagesBucket;
        this.client = getClient(awsRegion, awsCredentialsProvider);
    }

    public void uploadImage(MultipartFile image) {
        PutObjectRequest request = getRequest(image.getOriginalFilename());

        try {
            RequestBody requestBody = getRequestBody(image);
            client.putObject(request, requestBody);
        } catch (IOException | S3Exception exception) {
            exception.printStackTrace();
            throw new ImageSavingException(exception.getMessage());
        }
    }

    private S3Client getClient(Region region, StaticCredentialsProvider credentialsProvider) {
        return S3Client.builder()
                .region(region)
                .credentialsProvider(credentialsProvider)
                .build();
    }

    private PutObjectRequest getRequest(String fileName) {
        return PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
    }

    private RequestBody getRequestBody(MultipartFile file) throws IOException {
        return RequestBody.fromInputStream(
                new BufferedInputStream(file.getInputStream()),
                file.getSize()
        );
    }

}
