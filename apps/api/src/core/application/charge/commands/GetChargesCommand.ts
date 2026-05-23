export interface GetChargesCommand {
  page: number;
  pageSize: number;
  state?: string;
  fromDate?: Date;
  toDate?: Date;
}
