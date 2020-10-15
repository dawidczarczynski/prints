package com.dawidczarczynski.printsfiles.imageupload;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

@Service
class FileSystemStorageServiceImpl implements ImageStorageService {

    private final static Logger logger = Logger.getLogger(FileSystemStorageServiceImpl.class.getName());
    private final String directoryPath = "./images";

    public void storeImageFile(MultipartFile file) {
        try {
            Path filepath = Paths.get(directoryPath, file.getOriginalFilename());
            file.transferTo(filepath);
            logger.info("File saved: " + filepath.toString());
        } catch (IOException ioException) {
            ioException.printStackTrace();
            throw new ImageSavingException();
        }
    }

}
