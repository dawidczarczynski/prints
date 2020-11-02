package com.dawidczarczynski.printsfiles.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "File saving failure")
public class ImageSavingException extends RuntimeException {
    public ImageSavingException(String message) {
        super(message);
    }
}
