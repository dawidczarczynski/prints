package com.dawidczarczynski.printsfiles.common;

import java.util.List;

public interface DTOMapper {
    <S, T> T map(S source, Class<T> targetClass);
    <S, T> List<T> mapList(List<S> source, Class<T> targetClass);
}
