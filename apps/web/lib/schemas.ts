import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(1, 'Requerido')
});

export const rejectSchema = z.object({
  rejectDetails: z.string().min(10, 'Mínimo 10 caracteres')
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RejectInput = z.infer<typeof rejectSchema>;
