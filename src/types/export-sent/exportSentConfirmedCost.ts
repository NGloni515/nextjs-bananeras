export interface ExportSentConfirmedCost {
  id: number;
  createdAt: string;
  updatedAt: string;
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
  pendingProducerCost: boolean;
  pendingCuttingSheet: boolean;
  pendingProducerPayment: boolean;
  pendingClientPayment: boolean;
  exporterId: number;
  exportId: number;
  export: ExportDetail;
  pesticideSent: PesticideSent[];
  insecticideSent: InsecticideSent[];
  exportSentMaterials: ExportSentMaterial[];
}

interface ExportDetail {
  id: number;
  boxQuantity: number;
  shipName: string;
  bookingNumber: string;
  contractType: string;
  cuttingDate: string;
  weekDescription: string;
  weekDaysOfWeek: string[];
  weekBoxesOfDay: number[];
  weekTotal: number;
  merchant: EntityBasic;
  client: EntityBasic;
  business: EntityBusiness;
  boxBrand: BoxBrand;
}

interface EntityBasic {
  id: number;
  businessName: string;
  businessId?: string;
  address?: string;
}

interface EntityBusiness {
  id: number;
  name: string;
  codeMAGAP: string;
  codeAGROCALIDAD: string;
}

interface BoxBrand {
  id: number;
  name: string;
  brandCode: string;
  boxQuantity: number;
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
}

interface PesticideSent {
  id: number;
  pesticideId: number;
  quantity: number;
  exportSentId: number;
  exporterId: number;
}

interface InsecticideSent {
  id: number;
  insecticideId: number;
  quantity: number;
  exportSentId: number;
  exporterId: number;
}

interface ExportSentMaterial {
  id: number;
  exportSentId: number;
  businessMaterialStockId: number;
  quantity: number;
  unitCost: number;
  businessMaterialStock: BusinessMaterialStock;
}

interface BusinessMaterialStock {
  id: number;
  businessId: number;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  exporterMaterialStock: ExporterMaterialStock;
}

interface ExporterMaterialStock {
  id: number;
  exporterId: number;
  materialType: string;
  materialId: number;
  materialName: string;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  materialDetail: MaterialDetail;
}

interface MaterialDetail {
  id: number;
  name: string;
  code: string;
}
