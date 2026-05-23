import { Badge } from '@/components/ui/badge';

const CONFIG: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  REVIEWED: { label: 'Revisado', className: 'bg-blue-100 text-blue-800 border-blue-300' },
  CONFIRMED: { label: 'Confirmado', className: 'bg-green-100 text-green-800 border-green-300' },
  REJECTED: { label: 'Rechazado', className: 'bg-red-100 text-red-800 border-red-300' }
};

export default function StateBadge({ state }: { state: string }) {
  const cfg = CONFIG[state] ?? { label: state, className: '' };
  return (
    <Badge variant="outline" className={cfg.className}>
      {cfg.label}
    </Badge>
  );
}
