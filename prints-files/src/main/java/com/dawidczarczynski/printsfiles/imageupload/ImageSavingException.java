package com.dawidczarczynski.printsfiles.imageupload;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "File saving failure")
class ImageSavingException extends RuntimeException {
    public ImageSavingException() {
        super("Cannot save image file");
    }
}
