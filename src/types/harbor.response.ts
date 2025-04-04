/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContactResponse {
    id: number;
    name: string;
    web: string;
    email: string;
    phone: string;
}

export interface HarborResponse {
    id: number;
    type: string;
    name: string;
    code: string;
    address: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    openTime: string;
    closeTime: string;
    daysOfOperation: string[];
    country: { id: number; name: string };
    province: { id: number; name: string };
    city: { id: number; name: string };
    countryId: number;
    provinceId: number;
    cityId: number;
    contacts: ContactResponse[];
    createdAt: string;
    updatedAt: string;
    exporterId: number;
    clients: any[];
}