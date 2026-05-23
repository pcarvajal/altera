'use client';

import { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { reviewCharge } from '@/app/actions/charges';

type Props = { id: string; state: string };

export default function ReviewButton({ id, state }: Props) {
  const [optimisticState, setOptimistic] = useOptimistic(state);
  const [isPending, startTransition] = useTransition();

  if (optimisticState !== 'PENDING') return null;

  function handleClick() {
    startTransition(async () => {
      setOptimistic('REVIEWED');
      try {
        await reviewCharge(id);
        toast.success('Cobro marcado como revisado');
      } catch {
        toast.error('Error al revisar el cobro');
      }
    });
  }

  return (
    <Button size="sm" variant="outline" onClick={handleClick} disabled={isPending}>
      {isPending ? 'Revisando…' : 'Revisar'}
    </Button>
  );
}
