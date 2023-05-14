import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../notice.test-samples';

import { NoticeFormService } from './notice-form.service';

describe('Notice Form Service', () => {
  let service: NoticeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeFormService);
  });

  describe('Service methods', () => {
    describe('createNoticeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNoticeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            image: expect.any(Object),
            type: expect.any(Object),
          })
        );
      });

      it('passing INotice should create a new form with FormGroup', () => {
        const formGroup = service.createNoticeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            image: expect.any(Object),
            type: expect.any(Object),
          })
        );
      });
    });

    describe('getNotice', () => {
      it('should return NewNotice for default Notice initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNoticeFormGroup(sampleWithNewData);

        const notice = service.getNotice(formGroup) as any;

        expect(notice).toMatchObject(sampleWithNewData);
      });

      it('should return NewNotice for empty Notice initial value', () => {
        const formGroup = service.createNoticeFormGroup();

        const notice = service.getNotice(formGroup) as any;

        expect(notice).toMatchObject({});
      });

      it('should return INotice', () => {
        const formGroup = service.createNoticeFormGroup(sampleWithRequiredData);

        const notice = service.getNotice(formGroup) as any;

        expect(notice).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INotice should not enable id FormControl', () => {
        const formGroup = service.createNoticeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNotice should disable id FormControl', () => {
        const formGroup = service.createNoticeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
