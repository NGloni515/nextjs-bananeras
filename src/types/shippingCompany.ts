export type HarborInfo = {
  harborId: number | '';
  estDuration: string;
  cost: number | '';
};

export type ContactType = {
  name: string;
  email: string;
  phone: string;
};

export type ShippingCompanyType = {
  name: string;
  code: string;
  countryId: number | '';
  frequencies: string;
  cargoType: string;
  trackingPlatform: string;
  departureHarbors: Partial<HarborInfo>[];
  destinationHarbors: Partial<HarborInfo>[];
  contacts: Partial<ContactType>[];
};
