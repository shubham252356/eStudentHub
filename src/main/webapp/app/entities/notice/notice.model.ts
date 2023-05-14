import { NoticeType } from 'app/entities/enumerations/notice-type.model';

export interface INotice {
  id: number;
  title?: string | null;
  content?: string | null;
  image?: string | null;
  imageContentType?: string | null;
  type?: NoticeType | null;
}

export type NewNotice = Omit<INotice, 'id'> & { id: null };
