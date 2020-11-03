package com.dawidczarczynski.printsfiles.common.impl;

import com.dawidczarczynski.printsfiles.common.DTOMapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
class DTOMapperImpl implements DTOMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public <S, T> T map(S source, Class<T> targetClass) {
        return modelMapper.map(source, targetClass);
    }

    public <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source
                .stream()
                .map(item -> modelMapper.map(item, targetClass))
                .collect(Collectors.toList());
    }

}
