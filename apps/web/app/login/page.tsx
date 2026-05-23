import LoginForm from './_components/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const { expired } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <LoginForm expiredSession={expired === '1'} />
    </main>
  );
}
