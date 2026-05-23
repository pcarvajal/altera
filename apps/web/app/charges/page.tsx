import { getToken } from '@/lib/auth';
import { api, type ChargeResponse } from '@/lib/api';
import { logoutAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import ChargesTable from './_components/ChargesTable';

type SearchParams = {
  page?: string;
  pageSize?: string;
  state?: string;
  fromDate?: string;
  toDate?: string;
};

export default async function ChargesPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const token = await getToken();
  const params = await searchParams;

  const query = new URLSearchParams({
    page: params.page ?? '1',
    pageSize: params.pageSize ?? '50'
  });
  if (params.state) query.set('state', params.state);
  if (params.fromDate) query.set('fromDate', params.fromDate);
  if (params.toDate) query.set('toDate', params.toDate);

  const charges = await api.get<ChargeResponse[]>(`/charges?${query}`, token);

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Cobros</h1>
          <form action={logoutAction}>
            <Button variant="ghost" size="sm" type="submit">
              Cerrar sesión
            </Button>
          </form>
        </div>
        <ChargesTable charges={charges} />
      </div>
    </main>
  );
}
