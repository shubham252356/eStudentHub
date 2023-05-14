package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.domain.Notice;
import com.mycompany.myapp.repository.NoticeRepository;
import com.mycompany.myapp.service.criteria.NoticeCriteria;
import com.mycompany.myapp.service.dto.NoticeDTO;
import com.mycompany.myapp.service.mapper.NoticeMapper;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Notice} entities in the database.
 * The main input is a {@link NoticeCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link NoticeDTO} or a {@link Page} of {@link NoticeDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class NoticeQueryService extends QueryService<Notice> {

    private final Logger log = LoggerFactory.getLogger(NoticeQueryService.class);

    private final NoticeRepository noticeRepository;

    private final NoticeMapper noticeMapper;

    public NoticeQueryService(NoticeRepository noticeRepository, NoticeMapper noticeMapper) {
        this.noticeRepository = noticeRepository;
        this.noticeMapper = noticeMapper;
    }

    /**
     * Return a {@link List} of {@link NoticeDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<NoticeDTO> findByCriteria(NoticeCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Notice> specification = createSpecification(criteria);
        return noticeMapper.toDto(noticeRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link NoticeDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<NoticeDTO> findByCriteria(NoticeCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Notice> specification = createSpecification(criteria);
        return noticeRepository.findAll(specification, page).map(noticeMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(NoticeCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Notice> specification = createSpecification(criteria);
        return noticeRepository.count(specification);
    }

    /**
     * Function to convert {@link NoticeCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Notice> createSpecification(NoticeCriteria criteria) {
        Specification<Notice> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Notice_.id));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), Notice_.title));
            }
            if (criteria.getType() != null) {
                specification = specification.and(buildSpecification(criteria.getType(), Notice_.type));
            }
        }
        return specification;
    }
}
