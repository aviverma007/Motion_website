import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { DashboardDemo } from './DashboardDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardDemo />
  </StrictMode>,
)
