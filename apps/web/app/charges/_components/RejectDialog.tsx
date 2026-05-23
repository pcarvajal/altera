'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { rejectCharge } from '@/app/actions/charges';
import { RejectInput, rejectSchema } from '@/lib/schemas';

type Props = { id: string; state: string };

export default function RejectDialog({ id, state }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RejectInput>({ resolver: zodResolver(rejectSchema) });

  if (state !== 'REVIEWED') return null;

  async function onSubmit({ rejectDetails }: RejectInput) {
    try {
      await rejectCharge(id, rejectDetails);
      toast.success('Cobro rechazado');
      setOpen(false);
      reset();
    } catch {
      toast.error('Error al rechazar el cobro');
    }
  }

  return (
    <>
      <Button size="sm" variant="destructive" onClick={() => setOpen(true)}>
        Rechazar
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar cobro</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="rejectDetails">Detalles del rechazo</Label>
              <Input
                id="rejectDetails"
                placeholder="Motivo por el cual se rechaza el cobro"
                {...register('rejectDetails')}
              />
              {errors.rejectDetails && (
                <p className="text-xs text-destructive">{errors.rejectDetails.message}</p>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting}>
                {isSubmitting ? 'Rechazando…' : 'Confirmar rechazo'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
