package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NoticeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoticeDTO.class);
        NoticeDTO noticeDTO1 = new NoticeDTO();
        noticeDTO1.setId(1L);
        NoticeDTO noticeDTO2 = new NoticeDTO();
        assertThat(noticeDTO1).isNotEqualTo(noticeDTO2);
        noticeDTO2.setId(noticeDTO1.getId());
        assertThat(noticeDTO1).isEqualTo(noticeDTO2);
        noticeDTO2.setId(2L);
        assertThat(noticeDTO1).isNotEqualTo(noticeDTO2);
        noticeDTO1.setId(null);
        assertThat(noticeDTO1).isNotEqualTo(noticeDTO2);
    }
}
