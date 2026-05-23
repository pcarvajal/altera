'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const STATES = [
  { value: '', label: 'Todos los estados' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'REVIEWED', label: 'Revisado' },
  { value: 'CONFIRMED', label: 'Confirmado' },
  { value: 'REJECTED', label: 'Rechazado' }
];

export default function ChargesFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.set('page', '1');
      router.push(`/charges?${next.toString()}`);
    },
    [router, params]
  );

  const limpiar = () => router.push('/charges');

  const hasFilters = params.has('state') || params.has('fromDate') || params.has('toDate');

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        value={params.get('state') ?? ''}
        onChange={(e) => setParam('state', e.target.value)}
      >
        {STATES.map((e) => (
          <option key={e.value} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Desde</span>
        <Input
          type="date"
          className="w-40"
          value={params.get('fromDate') ?? ''}
          onChange={(e) => setParam('fromDate', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Hasta</span>
        <Input
          type="date"
          className="w-40"
          value={params.get('toDate') ?? ''}
          onChange={(e) => setParam('toDate', e.target.value)}
        />
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={limpiar}>
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
