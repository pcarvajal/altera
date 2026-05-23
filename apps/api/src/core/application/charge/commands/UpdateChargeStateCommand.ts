export interface UpdateChargeStateCommand {
  id: string;
  newState: string;
  rejectDetails?: string;
}
