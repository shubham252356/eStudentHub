import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INotice } from '../notice.model';
import { NoticeService } from '../service/notice.service';

@Injectable({ providedIn: 'root' })
export class NoticeRoutingResolveService implements Resolve<INotice | null> {
  constructor(protected service: NoticeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotice | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((notice: HttpResponse<INotice>) => {
          if (notice.body) {
            return of(notice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
