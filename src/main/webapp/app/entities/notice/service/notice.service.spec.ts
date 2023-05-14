import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INotice } from '../notice.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../notice.test-samples';

import { NoticeService } from './notice.service';

const requireRestSample: INotice = {
  ...sampleWithRequiredData,
};

describe('Notice Service', () => {
  let service: NoticeService;
  let httpMock: HttpTestingController;
  let expectedResult: INotice | INotice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NoticeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Notice', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const notice = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(notice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Notice', () => {
      const notice = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(notice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Notice', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Notice', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Notice', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNoticeToCollectionIfMissing', () => {
      it('should add a Notice to an empty array', () => {
        const notice: INotice = sampleWithRequiredData;
        expectedResult = service.addNoticeToCollectionIfMissing([], notice);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(notice);
      });

      it('should not add a Notice to an array that contains it', () => {
        const notice: INotice = sampleWithRequiredData;
        const noticeCollection: INotice[] = [
          {
            ...notice,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNoticeToCollectionIfMissing(noticeCollection, notice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Notice to an array that doesn't contain it", () => {
        const notice: INotice = sampleWithRequiredData;
        const noticeCollection: INotice[] = [sampleWithPartialData];
        expectedResult = service.addNoticeToCollectionIfMissing(noticeCollection, notice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(notice);
      });

      it('should add only unique Notice to an array', () => {
        const noticeArray: INotice[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const noticeCollection: INotice[] = [sampleWithRequiredData];
        expectedResult = service.addNoticeToCollectionIfMissing(noticeCollection, ...noticeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const notice: INotice = sampleWithRequiredData;
        const notice2: INotice = sampleWithPartialData;
        expectedResult = service.addNoticeToCollectionIfMissing([], notice, notice2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(notice);
        expect(expectedResult).toContain(notice2);
      });

      it('should accept null and undefined values', () => {
        const notice: INotice = sampleWithRequiredData;
        expectedResult = service.addNoticeToCollectionIfMissing([], null, notice, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(notice);
      });

      it('should return initial array if no Notice is added', () => {
        const noticeCollection: INotice[] = [sampleWithRequiredData];
        expectedResult = service.addNoticeToCollectionIfMissing(noticeCollection, undefined, null);
        expect(expectedResult).toEqual(noticeCollection);
      });
    });

    describe('compareNotice', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNotice(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNotice(entity1, entity2);
        const compareResult2 = service.compareNotice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNotice(entity1, entity2);
        const compareResult2 = service.compareNotice(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNotice(entity1, entity2);
        const compareResult2 = service.compareNotice(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
