package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Notice;
import com.mycompany.myapp.service.dto.NoticeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Notice} and its DTO {@link NoticeDTO}.
 */
@Mapper(componentModel = "spring")
public interface NoticeMapper extends EntityMapper<NoticeDTO, Notice> {}
