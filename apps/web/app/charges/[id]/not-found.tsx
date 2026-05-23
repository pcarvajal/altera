import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ChargesNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted/40">
      <h1 className="text-2xl font-semibold">Cobro no encontrado</h1>
      <p className="text-muted-foreground">El cobro que buscas no existe o fue eliminado.</p>
      <Button asChild>
        <Link href="/charges">Volver al listado</Link>
      </Button>
    </main>
  );
}
