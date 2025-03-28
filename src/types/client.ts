import { ContactType } from "./merchant/contact";

export type ClientType = {
  businessName: string;
  businessId: string;
  address: string;
  type: string | 'Supermercado' | 'Intermediario';
  commercialType: string;
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  annualPurchaseVolume: string;
  paymentConditions: string;
  shippingMethod: string;
  countryId: number | '';
  provinceId: number | '';
  cityId: number | '';
  harbors: number[] | null;
  incoterms: number[] | null;
  certificates: number[];
  contacts: Partial<ContactType>[];
};
