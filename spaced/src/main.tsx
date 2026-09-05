import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@assets/style/global.css'
import Routes from "@routes/routes"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
