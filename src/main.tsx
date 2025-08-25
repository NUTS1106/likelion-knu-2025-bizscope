import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from './router.tsx'
import { GlobalStyle } from './Styles/global.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,        // 5분 동안 신선
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle/>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
)
