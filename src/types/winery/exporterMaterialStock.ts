export interface ExporterMaterialStock {
  id: number;
  exporterId: number;
  materialId: number;
  materialType: string;
  materialName: string;
  materialDetail: {
    id: number;
    name: string;
    code: string;
    materialType: string;
  };
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  stockMovements: {
    id: number;
    createdAt: string;
    type: string;
    quantity: number;
    unitCost: number;
  }[];
  businessMaterialStocks: {
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
  }[];
}
