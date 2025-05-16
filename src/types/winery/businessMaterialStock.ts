export interface BusinessMaterialStock {
  id: number;
  createdAt: string;
  updatedAt: string;
  businessId: number;
  exporterMaterialStockId: number;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  business: {
    id: number;
    name: string;
    address: string;
    area: number;
    status: string;
    latitude: number | null;
    longitude: number | null;
    countryId: number;
    provinceId: number;
    cityId: number;
    codeMAGAP: string;
    codeAGROCALIDAD: string;
    fruitType: string;
    exporterId: number;
    merchantId: number;
    createdAt: string;
    updatedAt: string;
  };
}
