import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get('token')?.value;
  if (!token) redirect('/login?expired=1');
  return token;
}
