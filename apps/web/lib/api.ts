const BASE = process.env.API_URL_SSR ?? process.env.API_URL ?? 'http://localhost:3001';

export type ChargeResponse = {
  id: string;
  clientId: string;
  reference: string;
  amount: number;
  state: string;
  rejectDetails: string;
  generationDate: string;
};

type ApiOptions = { token?: string; body?: unknown };

async function request<T>(method: string, path: string, { token, body }: ApiOptions = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (res.status === 401) throw new Error('UNAUTHORIZED');

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.description ?? `Error ${res.status}`);
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') return undefined as T;
  return res.json();
}

export const api = {
  get:   <T>(path: string, token: string) => request<T>('GET', path, { token }),
  post:  <T>(path: string, body?: unknown, token?: string) => request<T>('POST', path, { body, token }),
  patch: <T>(path: string, body?: unknown, token?: string) => request<T>('PATCH', path, { body, token }),
};
