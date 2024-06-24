import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Contador } from "@/components/contador";
import { traerNumerosQuery } from "@/query/contador";
import { mostrarNumero } from "@/servicio/contador";
import 'dotenv/config';
export const dynamic = 'force-dynamic'

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: traerNumerosQuery.queryKey,
    queryFn: mostrarNumero
  })
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Contador />

        </HydrationBoundary>
      </div>
    </main>
  );
}