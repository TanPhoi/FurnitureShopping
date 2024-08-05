export type PaymentType = {
  id: number;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  type: string;
  cvv: string;
  isDefault: boolean;
};
