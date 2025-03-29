// types/cuttingSheet.response.ts

export interface CuttingSheetResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    cuttingTypeId: number;
    pdfKey: string;
    palletsHeight: string;
    containerPositioning: string;
    belowDeck: string;
    exportId: number;
    exporterId: number;
    pdfUrl: string;
    export: ExportDetail;
}

export interface ExportDetail {
    boxQuantity: number;
    boxBrand: BoxBrand;
    merchant: Merchant;
    business: Business;
    harborDeparture: Harbor;
    harborDestination: Harbor;
    client: Client;
}

export interface BoxBrand {
    id: number;
    name: string;
    brandCode: string;
    netWeightBox: number;
    grossWeightBox: number;
    bottomTypeId: number;
    bottomTypeQuantity: number;
    lidTypeId: number;
    lidTypeQuantity: number;
    coverTypeId: number;
    coverTypeQuantity: number;
    cardboardTypeId: number;
    cardboardTypeQuantity: number;
    parasealTypeId: number;
    parasealTypeQuantity: number;
    padTypeId: number;
    padTypeQuantity: number;
    spongeTypeId: number;
    spongeTypeQuantity: number;
    labelId: number;
    labelQuantity: number;
    bandId: number;
    bandQuantity: number;
    sachetId: number;
    sachetQuantity: number;
    rubberId: number;
    rubberQuantity: number;
    protectorId: number;
    protectorQuantity: number;
    clusterBagId: number;
    clusterBagQuantity: number;
    palletsTypeId: number;
    palletsTypeQuantity: number;
    miniPalletsTypeId: number;
    miniPalletsTypeQuantity: number;
    cornerTypeId: number;
    cornerTypeQuantity: number;
    reinforcementTypeId: number;
    reinforcementTypeQuantity: number;
    stapleId: number;
    stapleQuantity: number;
    strippingId: number;
    strippingQuantity: number;
    thermographId: number;
    thermographQuantity: number;
    sealId: number;
    sealQuantity: number;
    mettoLabelId: number;
    mettoLabelQuantity: number;
    packingTapeTypeId: number;
    packingTapeTypeQuantity: number;
    latexRemoverId: number;
    latexRemoverQuantity: number;
    blockingSheetId: number;
    blockingSheetQuantity: number;
    exporterId: number;
}

export interface Merchant {
    id: number;
    businessName: string;
    countryId: number;
    provinceId: number;
    cityId: number;
    email: string;
    businessId: string;
    address: string;
    contractType: string;
    status: string;
    exporterId: number;
}

export interface Business {
    id: number;
    name: string;
    countryId: number;
    provinceId: number;
    cityId: number;
    address: string;
    fruitType: string;
    area: number;
    latitude: number | null;
    longitude: number | null;
    codeMAGAP: string;
    codeAGROCALIDAD: string;
    status: string;
    exporterId: number;
    merchantId: number;
}

export interface Harbor {
    id: number;
    name: string;
    type: string;
    code: string;
    address: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    openTime: string;
    closeTime: string;
    daysOfOperation: string[];
    countryId: number;
    provinceId: number;
    cityId: number;
    exporterId: number;
}

export interface Client {
    id: number;
    businessName: string;
    businessId: string;
    address: string;
    type: string;
    countryId: number;
    provinceId: number;
    cityId: number;
    postalCode: string;
    email: string;
    phone: string;
    website: string;
    commercialType: string;
    annualPurchaseVolume: string;
    paymentConditions: string;
    shippingMethod: string;
    exporterId: number;
}
