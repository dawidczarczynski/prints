package com.dawidczarczynski.printsfiles.configuration;

import com.dawidczarczynski.printsfiles.common.DTOMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UploadConfigController {

    private final UploadConfig configuration;
    private final DTOMapper dtoMapper;

    public UploadConfigController(UploadConfig configuration, DTOMapper dtoMapper) {
        this.configuration = configuration;
        this.dtoMapper = dtoMapper;
    }

    @GetMapping("/configuration")
    public ResponseEntity<UploadConfigDTO> getConfiguration() {
        UploadConfigDTO dto = dtoMapper.map(configuration, UploadConfigDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

}
