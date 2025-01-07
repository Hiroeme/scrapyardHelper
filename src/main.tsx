import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from "@vercel/analytics/react"


import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <SpeedInsights/>
    <Analytics/>
  </>
)
