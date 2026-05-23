import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToken } from '@/lib/auth';
import { api, type ChargeResponse } from '@/lib/api';
import RevisarButton from '../_components/ReviewButton';
import ConfirmarButton from '../_components/ConfirmButton';
import RechazarDialog from '../_components/RejectDialog';
import { Button } from '@/components/ui/button';
import StateBadge from '../_components/StateBadge';

function formatCLP(amount: number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
}

export default async function ChargesDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const token = await getToken();
  const { id } = await params;
  const prevParams = await searchParams;

  let charge: ChargeResponse;
  try {
    charge = await api.get<ChargeResponse>(`/charges/${id}`, token);
  } catch {
    notFound();
  }

  const backKeys = ['page', 'state', 'fromDate', 'toDate'];
  const backQuery = new URLSearchParams(
    Object.fromEntries(Object.entries(prevParams).filter(([k]) => backKeys.includes(k)))
  ).toString();

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/charges${backQuery ? `?${backQuery}` : ''}`}>← Volver al listado</Link>
          </Button>
          <h1 className="text-xl font-semibold">Detalle de cobro</h1>
        </div>

        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estado</span>
            <StateBadge state={charge.state} />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Referencia</p>
              <p className="font-mono text-sm">{charge.reference}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Monto</p>
              <p className="font-semibold">{formatCLP(Number(charge.amount))}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Cliente ID</p>
              <p className="font-mono text-sm">{charge.clientId}</p>
            </div>
            {charge.rejectDetails && (
              <div className="col-span-2 rounded-md bg-destructive/10 p-3">
                <p className="text-xs text-muted-foreground mb-1">Motivo de rechazo</p>
                <p className="text-sm text-destructive">{charge.rejectDetails}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <RevisarButton id={charge.id} state={charge.state} />
          <ConfirmarButton id={charge.id} state={charge.state} />
          <RechazarDialog id={charge.id} state={charge.state} />
        </div>
      </div>
    </main>
  );
}
