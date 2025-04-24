export interface ClientPaymentType {
  exportSentId: number | '';
  clientId: number | '';
  boxQuantity: number | '';
  boxBrandId: number | '';
  total: number | '';
  price: number | '';
  description: string;
  sourceBankAccountId: number | '';
  destinationBankAccountId: number | '';
  transferFile: File | null;
}
