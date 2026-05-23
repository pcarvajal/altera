'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginAction } from '@/app/actions/auth';
import { loginSchema, type LoginInput } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = { expiredSession: boolean };

export default function LoginForm({ expiredSession }: Props) {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  const {
    register,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (expiredSession) toast.warning('Tu sesión expiró. Inicia sesión nuevamente.');
  }, [expiredSession]);

  return (
    <div className="w-full max-w-sm rounded-lg border bg-card p-8 shadow-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground">Sistema de gestión de cobros</p>
      </div>

      {state?.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <form action={action} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="usuario@ejemplo.com"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>
    </div>
  );
}
