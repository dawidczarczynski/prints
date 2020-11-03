package com.dawidczarczynski.printsfiles.configuration;

import lombok.Data;

import java.util.List;

@Data
public class UploadConfigDTO {
    private List<String> allowedFileExtensions;
    private String maxFileSize;
}
