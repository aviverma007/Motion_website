import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { StudioDemo } from './StudioDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudioDemo />
  </StrictMode>,
)
