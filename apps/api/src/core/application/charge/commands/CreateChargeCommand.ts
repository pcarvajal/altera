export interface CreateChargeCommand {
  clientId: string;
  reference: string;
  generationDate: Date;
  amount: number;
  rejectDetails?: string;
}
