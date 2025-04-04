import { ContactType } from './merchant/contact';

export type HarborType = {
  id: number | '';
  type: string;
  name: string;
  country: { id: number; name: string };
  province: { id: number; name: string };
  city: { id: number; name: string };
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
