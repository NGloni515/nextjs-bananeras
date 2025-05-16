export interface MaterialDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  exporterId: number;
}

export interface ExporterMaterialStock {
  id: number;
  createdAt: string;
  updatedAt: string;
  exporterId: number;
  materialType:
    | 'BOTTOM'
    | 'LID'
    | 'COVER'
    | 'CARDBOARD'
    | 'PARASEAL'
    | 'PAD'
    | 'SPONGE'
    | 'LABEL'
    | 'BAND'
    | 'SACHET'
    | 'RUBBER'
    | 'PROTECTOR'
    | 'CLUSTER_BAG'
    | 'STAPLE'
    | 'STRIPPING'
    | 'THERMOGRAPH'
    | 'SEAL'
    | 'METTO_LABEL'
    | 'LATEX_REMOVER'
    | 'BLOCKING_SHEET';
  materialId: number;
  materialName: string;
  assignedStock: number;
  currentStock: number;
  assignedCost: number;
  currentCost: number;
  materialDetail: MaterialDetail;
}
