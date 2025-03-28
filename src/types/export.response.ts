export interface ExportResponse {
    id: number;
    boxQuantity: number;
    pendingExportSent: boolean | null;
    exportSent: boolean | null;
    shipName: string;
    estimatedTravelTime: string;
    bookingNumber: string;
    cutOffTime: string;

    merchant: {
        id: number;
        businessName: string;
        businessId: string;
        city: { id: number; name: string };
        address: string;
    };

    business: {
        id: number;
        name: string;
        address: string;
        area: number;
        city: { id: number; name: string };
        latitude: number | null;
        longitude: number | null;
        contacts: Contact[];
    };

    boxBrand: {
        id: number;
        name: string;
        brandCode: string;
        brand: { id: number; name: string };
    };

    harborDeparture: {
        id: number;
        name: string;
        city: { id: number; name: string };
        country: { id: number; name: string };
        latitude: number | null;
        longitude: number | null;
    };

    harborDestination: {
        id: number;
        name: string;
        city: { id: number; name: string };
        country: { id: number; name: string };
        latitude: number | null;
        longitude: number | null;
    };

    client: {
        id: number;
        businessName: string;
        businessId: string;
        commercialType: string;
        email: string;
        phone: string;
    };

    shippingCompany: {
        id: number;
        name: string;
        code: string;
        contacts: Contact[];
    };

    deposit: {
        id: number;
        name: string;
        address: string;
        city: { id: number; name: string };
        contacts: Contact[];
    };

    transport: {
        id: number;
        name: string;
        ruc: string;
        address: string;
        satelliteTracking: boolean;
        contacts: Contact[];
    };

    verifier: {
        id: number;
        name: string;
        ruc: string;
        address: string;
        contacts: Contact[];
    };
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}
