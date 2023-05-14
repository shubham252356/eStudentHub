package com.mycompany.myapp.service.criteria;

import com.mycompany.myapp.domain.enumeration.NoticeType;
import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.Notice} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.NoticeResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /notices?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NoticeCriteria implements Serializable, Criteria {

    /**
     * Class for filtering NoticeType
     */
    public static class NoticeTypeFilter extends Filter<NoticeType> {

        public NoticeTypeFilter() {}

        public NoticeTypeFilter(NoticeTypeFilter filter) {
            super(filter);
        }

        @Override
        public NoticeTypeFilter copy() {
            return new NoticeTypeFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter title;

    private NoticeTypeFilter type;

    private Boolean distinct;

    public NoticeCriteria() {}

    public NoticeCriteria(NoticeCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.title = other.title == null ? null : other.title.copy();
        this.type = other.type == null ? null : other.type.copy();
        this.distinct = other.distinct;
    }

    @Override
    public NoticeCriteria copy() {
        return new NoticeCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getTitle() {
        return title;
    }

    public StringFilter title() {
        if (title == null) {
            title = new StringFilter();
        }
        return title;
    }

    public void setTitle(StringFilter title) {
        this.title = title;
    }

    public NoticeTypeFilter getType() {
        return type;
    }

    public NoticeTypeFilter type() {
        if (type == null) {
            type = new NoticeTypeFilter();
        }
        return type;
    }

    public void setType(NoticeTypeFilter type) {
        this.type = type;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final NoticeCriteria that = (NoticeCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(title, that.title) &&
            Objects.equals(type, that.type) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, type, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NoticeCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (title != null ? "title=" + title + ", " : "") +
            (type != null ? "type=" + type + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
