'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';

export async function reviewCharge(id: string) {
  const token = await getToken();
  await api.patch(`/charges/${id}/review`, undefined, token);
  revalidatePath('/charges');
  revalidatePath(`/charges/${id}`);
}

export async function confirmCharge(id: string) {
  const token = await getToken();
  await api.patch(`/charges/${id}/confirm`, undefined, token);
  revalidatePath('/charges');
  revalidatePath(`/charges/${id}`);
}

export async function rejectCharge(id: string, rejectDetails: string) {
  const token = await getToken();
  await api.patch(`/charges/${id}/reject`, { rejectDetails }, token);
  revalidatePath('/charges');
  revalidatePath(`/charges/${id}`);
}
