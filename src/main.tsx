import React from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import App from './App'
import { ApiProvider } from './lib/ApiConfig'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApiProvider>
  </React.StrictMode>
)
