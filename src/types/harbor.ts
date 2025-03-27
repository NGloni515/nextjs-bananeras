import { ContactType } from './merchant/contact';

export type HarborType = {
  id: number | '';
  type: string;
  name: string;
  countryId: number | '';
  provinceId: number | '';
  cityId: number | '';
  address: string;
  location: string;
  latitude: number | '';
  longitude: number | '';
  openTime: string;
  closeTime: string;
  daysOfOperation: string[];
  contacts: Partial<ContactType>[];
};
