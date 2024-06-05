import { BlockingSheetType } from './additions/blockingSheet';
import { CochibiolType } from './additions/cochibiol';
import { LatexRemoverType } from './additions/latexRemover';
import { MettoLabelType } from './container/mettoLabel';
import { SealType } from './container/seal';
import { StapleType } from './container/staple';
import { StrippingType } from './container/stripping';
import { ThermographType } from './container/thermograph';
import { BandType } from './materials/band';
import { ClusterBagType } from './materials/clusterBag';
import { LabelType } from './materials/label';
import { ProtectorType } from './materials/protector';
import { RubberType } from './materials/rubber';
import { SachetType } from './materials/sachet';
import { PesticideType } from './post-harvest/pesticide';
import { BrandType } from './specifications/brand';
import { CertificateType } from './specifications/certificate';

export type BoxBrandType = {
  id: number | '';
  // specifications
  brand: Partial<BrandType>;
  name: string;
  brandCode: string;
  boxQuantity: number | '';
  netWeightBox: number | '';
  grossWeightBox: number | '';
  certificateId: number[] | null;
  certificates: Partial<CertificateType>[];
  // materials
  bottomType: string;
  lidType: string;
  coverType: string;
  cardboardType: string;
  padType: string;
  spongeType: string;
  label: Partial<LabelType>;
  labelQuantity: number | '';
  band: Partial<BandType>;
  bandQuantity: number | '';
  sachet: Partial<SachetType>;
  sachetQuantity: number | '';
  rubber: Partial<RubberType>;
  rubberQuantity: number | '';
  protector: Partial<ProtectorType>;
  protectorQuantity: number | '';
  clusterBag: Partial<ClusterBagType>;
  clusterBagQuantity: number | '';
  // post harvest
  pesticideId: number[] | null;
  pesticide: Partial<PesticideType>[];
  pesticideQuantity: number | '';
  // container
  palletsType: string;
  palletsTypeQuantity: number | '';
  miniPalletsType: string;
  miniPalletsTypeQuantity: number | '';
  cornerType: string;
  cornerTypeQuantity: number | '';
  reinforcementType: string;
  reinforcementTypeQuantity: number | '';
  staple: Partial<StapleType>;
  stapleQuantity: number | '';
  stripping: Partial<StrippingType>;
  strippingQuantity: number | '';
  thermograph: Partial<ThermographType>;
  thermographQuantity: number | '';
  seal: Partial<SealType>;
  sealQuantity: number | '';
  mettoLabel: Partial<MettoLabelType>;
  mettoLabelQuantity: number | '';
  // additions
  packingTapeType: string;
  packingTapeTypeQuantity: number | '';
  latexRemover: Partial<LatexRemoverType>;
  latexRemoverQuantity: number | '';
  cochibiol: Partial<CochibiolType>;
  cochibiolQuantity: number | '';
  blockingSheet: Partial<BlockingSheetType>;
  blockingSheetQuantity: number | '';
};
