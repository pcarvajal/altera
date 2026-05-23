export interface ClientFinder {
  existsById(clientId: string): Promise<boolean>;
}
