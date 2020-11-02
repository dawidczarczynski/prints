package com.dawidczarczynski.printsfiles.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;

@Configuration
public class AmazonS3Config {

    @Value("${aws.access.key.id}")
    private String awsKeyId;

    @Value("${aws.access.key.secret}")
    private String awsKeySecret;

    @Value("${aws.region}")
    private String awsRegion;

    @Value("${aws.s3.images.bucket}")
    private String awsS3ImagesBucket;

    @Bean(name="awsRegion")
    public Region getAwsRegion() {
        return Region.of(awsRegion);
    }

    @Bean(name="awsCredentialsProvider")
    public StaticCredentialsProvider getAwsCredentials() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(awsKeyId, awsKeySecret);
        return StaticCredentialsProvider.create(awsCredentials);
    }

    @Bean(name="awsS3ImagesBucket")
    public String getAwsS3ImageBucket() {
        return  awsS3ImagesBucket;
    }

}
