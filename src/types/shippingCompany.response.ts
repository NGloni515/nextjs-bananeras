export interface ShippingCompanyResponse {
    id: number;
    name: string;
    code: string;
    frequencies: string;
    cargoType: string;
    trackingPlatform: string;
    country: {
        id: number;
        name: string;
    };
    countryId: number;
    contacts: ShippingCompanyContact[];
    departureHarbors: ShippingCompanyHarbor[];
    destinationHarbors: ShippingCompanyHarbor[];
    createdAt: string;
    updatedAt: string;
    exporterId: number;
}

export interface ShippingCompanyContact {
    id: number;
    name: string;
    role: string | null;
    email: string;
    phone: string;
}

export interface ShippingCompanyHarbor {
    harbor: {
        id: number;
        name: string;
    };
    estDuration: string;
    cost: number;
}
