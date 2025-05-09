export interface MaterialDetail {
  id: number;
  name: string;
  code: string;
  exporterId: number;
}

export interface ExporterMaterialStock {
  id: number;
  materialType: string;
  materialId: number;
  materialName: string;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  materialDetail: MaterialDetail;
}

export interface BusinessMaterialStock {
  id: number;
  businessId: number;
  exporterMaterialStockId: number;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  exporterMaterialStock: ExporterMaterialStock;
}

export interface ExportSentMaterialResponse {
  id: number;
  exportSentId: number;
  quantity: number;
  unitCost: number;
  businessMaterialStock: BusinessMaterialStock;
}
