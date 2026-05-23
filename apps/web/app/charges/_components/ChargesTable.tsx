'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { ChargeResponse } from '@/lib/api';
import StateBadge from './StateBadge';
import ChargesFilter from './ChargesFilter';

function formatCLP(amount: number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
}

function ChargesTableInner({ charges }: { charges: ChargeResponse[] }) {
  const params = useSearchParams();
  const currentParams = params.toString();

  const sorted = [...charges].sort(
    (a, b) => new Date(b.generationDate).getTime() - new Date(a.generationDate).getTime()
  );

  return (
    <div className="space-y-4">
      <Suspense>
        <ChargesFilter />
      </Suspense>

      {charges.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No hay cobros para los filtros seleccionados.
        </p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Cliente ID</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((charge) => (
                <TableRow key={charge.id}>
                  <TableCell className="font-mono text-xs">{charge.reference}</TableCell>
                  <TableCell>
                    <StateBadge state={charge.state} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCLP(Number(charge.amount))}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {charge.clientId.slice(0, 8)}…
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/charges/${charge.id}${currentParams ? `?${currentParams}` : ''}`}
                      >
                        Ver detalle
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default function ChargesTable({ charges }: { charges: ChargeResponse[] }) {
  return (
    <Suspense>
      <ChargesTableInner charges={charges} />
    </Suspense>
  );
}
