export interface TokenPayload {
  sub: string; // userId
  email: string;
  role: string;
}

export interface TokenPort {
  sign(payload: TokenPayload): string;
}
