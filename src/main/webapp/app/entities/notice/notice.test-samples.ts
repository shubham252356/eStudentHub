import { NoticeType } from 'app/entities/enumerations/notice-type.model';

import { INotice, NewNotice } from './notice.model';

export const sampleWithRequiredData: INotice = {
  id: 18953,
  title: 'Berkshire',
  content: '../fake-data/blob/hipster.txt',
  type: NoticeType['CULTURAL'],
};

export const sampleWithPartialData: INotice = {
  id: 93193,
  title: 'coherent monitor',
  content: '../fake-data/blob/hipster.txt',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  type: NoticeType['CULTURAL'],
};

export const sampleWithFullData: INotice = {
  id: 2617,
  title: 'Arab',
  content: '../fake-data/blob/hipster.txt',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  type: NoticeType['GENERAL'],
};

export const sampleWithNewData: NewNotice = {
  title: 'SCSI',
  content: '../fake-data/blob/hipster.txt',
  type: NoticeType['SPORTS'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
