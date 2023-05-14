import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INotice, NewNotice } from '../notice.model';

export type PartialUpdateNotice = Partial<INotice> & Pick<INotice, 'id'>;

export type EntityResponseType = HttpResponse<INotice>;
export type EntityArrayResponseType = HttpResponse<INotice[]>;

@Injectable({ providedIn: 'root' })
export class NoticeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/notices');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(notice: NewNotice): Observable<EntityResponseType> {
    return this.http.post<INotice>(this.resourceUrl, notice, { observe: 'response' });
  }

  update(notice: INotice): Observable<EntityResponseType> {
    return this.http.put<INotice>(`${this.resourceUrl}/${this.getNoticeIdentifier(notice)}`, notice, { observe: 'response' });
  }

  partialUpdate(notice: PartialUpdateNotice): Observable<EntityResponseType> {
    return this.http.patch<INotice>(`${this.resourceUrl}/${this.getNoticeIdentifier(notice)}`, notice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INotice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INotice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNoticeIdentifier(notice: Pick<INotice, 'id'>): number {
    return notice.id;
  }

  compareNotice(o1: Pick<INotice, 'id'> | null, o2: Pick<INotice, 'id'> | null): boolean {
    return o1 && o2 ? this.getNoticeIdentifier(o1) === this.getNoticeIdentifier(o2) : o1 === o2;
  }

  addNoticeToCollectionIfMissing<Type extends Pick<INotice, 'id'>>(
    noticeCollection: Type[],
    ...noticesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const notices: Type[] = noticesToCheck.filter(isPresent);
    if (notices.length > 0) {
      const noticeCollectionIdentifiers = noticeCollection.map(noticeItem => this.getNoticeIdentifier(noticeItem)!);
      const noticesToAdd = notices.filter(noticeItem => {
        const noticeIdentifier = this.getNoticeIdentifier(noticeItem);
        if (noticeCollectionIdentifiers.includes(noticeIdentifier)) {
          return false;
        }
        noticeCollectionIdentifiers.push(noticeIdentifier);
        return true;
      });
      return [...noticesToAdd, ...noticeCollection];
    }
    return noticeCollection;
  }
}
