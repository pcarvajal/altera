export interface ChargeScalar {
  id?: string;
  reference: string;
  clientId: string;
  generationDate: Date;
  amount: number;
  state: string;
  rejectDetails: string;
  createdAt: Date;
  updatedAt: Date;
}
