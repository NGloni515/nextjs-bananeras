export interface MaterialType {
    id: number;
    name: string;
}

export interface Pesticide {
    id: number;
    name: string;
    code: string;
    brandName: string;
    activeIngredient: string;
    dose: number;
    presentation: string;
}

export interface Insecticide {
    id: number;
    name: string;
    code: string;
    activeIngredient: string;
    dose: number;
}

export interface PesticideSent {
    id: number;
    pesticide: Pesticide;
    quantity: number;
}

export interface InsecticideSent {
    id: number;
    insecticide: Insecticide;
    quantity: number;
}

export interface ExportSentType {
    id: number;
    export: {
        id: number;
        boxQuantity: number;
        pendingExportSent?: boolean;
        boxBrand: {
            id: number;
            name: string;
            brandCode: string;
            netWeightBox: number;
            grossWeightBox: number;
            bottomType?: MaterialType;
            lidType?: MaterialType;
            coverType?: MaterialType;
            cardboardType?: MaterialType;
            parasealType?: MaterialType;
            padType?: MaterialType;
            spongeType?: MaterialType;
            packingTapeType?: MaterialType;
            cornerType?: MaterialType;
            reinforcementType?: MaterialType;
            miniPalletsType?: MaterialType;
        };
        merchant: {
            businessName: string;
            businessId: string;
            email: string;
            address: string;
            contractType: string;
        };
        business: {
            name: string;
            address: string;
            fruitType: string;
            area: number;
        };
        client: {
            businessName: string;
        };
        harborDeparture?: {
            name: string;
            type: string;
            address: string;
            loaction: string;
        };
        harborDestination?: {
            name: string;
            type: string;
            address: string;
            loaction: string;
        };
    };
    bottomTypeQuantity: number;
    lidTypeQuantity: number;
    coverTypeQuantity: number;
    cardboardTypeQuantity: number;
    parasealTypeQuantity: number;
    padTypeQuantity: number;
    spongeTypeQuantity: number;
    labelQuantity: number;
    bandQuantity: number;
    sachetQuantity: number;
    rubberQuantity: number;
    protectorQuantity: number;
    clusterBagQuantity: number;
    palletsTypeQuantity: number;
    miniPalletsTypeQuantity: number;
    cornerTypeQuantity: number;
    reinforcementTypeQuantity: number;
    stapleQuantity: number;
    strippingQuantity: number;
    thermographQuantity: number;
    sealQuantity: number;
    mettoLabelQuantity: number;
    packingTapeTypeQuantity: number;
    latexRemoverQuantity: number;
    blockingSheetQuantity: number;
    pesticideSent: PesticideSent[];
    insecticideSent: InsecticideSent[];
    pendingProducerPayment?: boolean;
}
