package com.dawidczarczynski.printsfiles.imageupload;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface FileConverter {
    File multipartToFile(MultipartFile file) throws IOException;
}
