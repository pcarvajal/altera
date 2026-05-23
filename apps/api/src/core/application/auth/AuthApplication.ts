export interface LoginInput {
  email: string;
  password: string; // texto plano
}

export interface LoginOutput {
  accessToken: string;
}

export abstract class AuthApplication {
  abstract login(input: LoginInput): Promise<LoginOutput>;
}
