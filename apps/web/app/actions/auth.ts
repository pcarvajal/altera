'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/lib/api';

export async function loginAction(_: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const { accessToken } = await api.post<{ accessToken: string }>('/auth/login', {
      email,
      password
    });
    const store = await cookies();
    store.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
    });
  } catch {
    return { error: 'Credenciales inválidas' };
  }

  redirect('/charges');
}

export async function logoutAction() {
  const store = await cookies();
  store.delete('token');
  redirect('/login');
}
