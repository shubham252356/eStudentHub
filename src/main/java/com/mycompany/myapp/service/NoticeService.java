package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Notice;
import com.mycompany.myapp.repository.NoticeRepository;
import com.mycompany.myapp.service.dto.NoticeDTO;
import com.mycompany.myapp.service.mapper.NoticeMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Notice}.
 */
@Service
@Transactional
public class NoticeService {

    private final Logger log = LoggerFactory.getLogger(NoticeService.class);

    private final NoticeRepository noticeRepository;

    private final NoticeMapper noticeMapper;

    public NoticeService(NoticeRepository noticeRepository, NoticeMapper noticeMapper) {
        this.noticeRepository = noticeRepository;
        this.noticeMapper = noticeMapper;
    }

    /**
     * Save a notice.
     *
     * @param noticeDTO the entity to save.
     * @return the persisted entity.
     */
    public NoticeDTO save(NoticeDTO noticeDTO) {
        log.debug("Request to save Notice : {}", noticeDTO);
        Notice notice = noticeMapper.toEntity(noticeDTO);
        notice = noticeRepository.save(notice);
        return noticeMapper.toDto(notice);
    }

    /**
     * Update a notice.
     *
     * @param noticeDTO the entity to save.
     * @return the persisted entity.
     */
    public NoticeDTO update(NoticeDTO noticeDTO) {
        log.debug("Request to update Notice : {}", noticeDTO);
        Notice notice = noticeMapper.toEntity(noticeDTO);
        notice = noticeRepository.save(notice);
        return noticeMapper.toDto(notice);
    }

    /**
     * Partially update a notice.
     *
     * @param noticeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<NoticeDTO> partialUpdate(NoticeDTO noticeDTO) {
        log.debug("Request to partially update Notice : {}", noticeDTO);

        return noticeRepository
            .findById(noticeDTO.getId())
            .map(existingNotice -> {
                noticeMapper.partialUpdate(existingNotice, noticeDTO);

                return existingNotice;
            })
            .map(noticeRepository::save)
            .map(noticeMapper::toDto);
    }

    /**
     * Get all the notices.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<NoticeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Notices");
        return noticeRepository.findAll(pageable).map(noticeMapper::toDto);
    }

    /**
     * Get one notice by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NoticeDTO> findOne(Long id) {
        log.debug("Request to get Notice : {}", id);
        return noticeRepository.findById(id).map(noticeMapper::toDto);
    }

    /**
     * Delete the notice by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Notice : {}", id);
        noticeRepository.deleteById(id);
    }
}
