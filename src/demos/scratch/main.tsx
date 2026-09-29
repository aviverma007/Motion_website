import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { ScratchDemo } from './ScratchDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScratchDemo />
  </StrictMode>,
)
