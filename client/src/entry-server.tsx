import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Router } from "wouter";
import superjson from "superjson";
import { trpc } from "./lib/trpc";
import App from "./App";
import { preloadRoute } from "./routes";
import { seoForPath } from "./seo";

export async function render(url: string) {
  await preloadRoute(url);
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });
  // All primary page content is static. Google reviews remain client-fetched;
  // no third-party request, cookies, patient information or auth is read by SSR.
  const dehydratedState = dehydrate(queryClient);
  const client = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] });
  const index = url.indexOf("?");
  const pathname = index < 0 ? url : url.slice(0, index);
  const search = index < 0 ? "" : url.slice(index + 1);
  const html = renderToString(
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <Router ssrPath={pathname} ssrSearch={search}><App /></Router>
        </HydrationBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
  queryClient.clear();
  return { html, dehydratedState, head: seoForPath(url) };
}
