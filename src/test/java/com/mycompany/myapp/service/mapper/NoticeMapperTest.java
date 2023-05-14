package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class NoticeMapperTest {

    private NoticeMapper noticeMapper;

    @BeforeEach
    public void setUp() {
        noticeMapper = new NoticeMapperImpl();
    }
}
