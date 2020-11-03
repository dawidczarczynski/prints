package com.dawidczarczynski.printsfiles.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
public class UploadConfig {

    @Value("${file.allowed-extensions}")
    private List<String> allowedFileExtensions;

    @Value("${spring.servlet.multipart.max-file-size}")
    private String maxFileSize;

}
