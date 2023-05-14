import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INotice, NewNotice } from '../notice.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INotice for edit and NewNoticeFormGroupInput for create.
 */
type NoticeFormGroupInput = INotice | PartialWithRequiredKeyOf<NewNotice>;

type NoticeFormDefaults = Pick<NewNotice, 'id'>;

type NoticeFormGroupContent = {
  id: FormControl<INotice['id'] | NewNotice['id']>;
  title: FormControl<INotice['title']>;
  content: FormControl<INotice['content']>;
  image: FormControl<INotice['image']>;
  imageContentType: FormControl<INotice['imageContentType']>;
  type: FormControl<INotice['type']>;
};

export type NoticeFormGroup = FormGroup<NoticeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NoticeFormService {
  createNoticeFormGroup(notice: NoticeFormGroupInput = { id: null }): NoticeFormGroup {
    const noticeRawValue = {
      ...this.getFormDefaults(),
      ...notice,
    };
    return new FormGroup<NoticeFormGroupContent>({
      id: new FormControl(
        { value: noticeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(noticeRawValue.title, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      content: new FormControl(noticeRawValue.content, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      image: new FormControl(noticeRawValue.image),
      imageContentType: new FormControl(noticeRawValue.imageContentType),
      type: new FormControl(noticeRawValue.type, {
        validators: [Validators.required],
      }),
    });
  }

  getNotice(form: NoticeFormGroup): INotice | NewNotice {
    return form.getRawValue() as INotice | NewNotice;
  }

  resetForm(form: NoticeFormGroup, notice: NoticeFormGroupInput): void {
    const noticeRawValue = { ...this.getFormDefaults(), ...notice };
    form.reset(
      {
        ...noticeRawValue,
        id: { value: noticeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NoticeFormDefaults {
    return {
      id: null,
    };
  }
}
