export class GetChargeResponse {
  id!: string;
  clientId!: string;
  reference!: string;
  amount!: number;
  state!: string;
  rejectDetails?: string;
}
