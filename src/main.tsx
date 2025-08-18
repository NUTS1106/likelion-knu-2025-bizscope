import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { GlobalStyle } from './Styles/global.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle/>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
