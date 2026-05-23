export interface CreateChargeCommand {
  clientId: string;
  reference: string;
  amount: number;
}
