'use client';

import { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { confirmCharge } from '@/app/actions/charges';

type Props = { id: string; state: string };

export default function ConfirmButton({ id, state }: Props) {
  const [optimisticState, setOptimistic] = useOptimistic(state);
  const [isPending, startTransition] = useTransition();

  if (optimisticState !== 'REVIEWED') return null;

  function handleClick() {
    startTransition(async () => {
      setOptimistic('CONFIRMED');
      try {
        await confirmCharge(id);
        toast.success('Cobro confirmado');
      } catch {
        toast.error('Error al confirmar el cobro');
      }
    });
  }

  return (
    <Button size="sm" variant="default" onClick={handleClick} disabled={isPending}>
      {isPending ? 'Confirmando…' : 'Confirmar'}
    </Button>
  );
}
