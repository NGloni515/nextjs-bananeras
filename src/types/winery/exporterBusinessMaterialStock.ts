export type StockMovementType = 'TRANSFER' | 'CONSUMPTION';

export interface StockMovement {
  id: number;
  createdAt: string;
  type: StockMovementType;
  quantity: number;
  unitCost: number;
  exporterMaterialStockId: number;
  toBusinessStockId: number | null;
  fromBusinessStockId: number | null;
  exportSentId: number | null;
}

export interface ExporterMaterialStock {
  id: number;
  createdAt: string;
  updatedAt: string;
  exporterId: number;
  materialType: string;
  materialId: number;
  materialName: string;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
}

export interface MaterialDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  exporterId: number;
  brandName?: string;
  activeIngredient?: string;
  dose?: number;
  presentation?: string;
  dimensions?: string;
}

export interface ExporterBusinessMaterialStock {
  id: number;
  createdAt: string;
  updatedAt: string;
  businessId: number;
  exporterMaterialStockId: number;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  stockMovementsFromExporter: StockMovement[];
  stockMovementsConsumption: StockMovement[];
  exporterMaterialStock: ExporterMaterialStock;
  materialDetail: MaterialDetail;
}
