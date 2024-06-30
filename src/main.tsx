import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'
import { ApiProvider } from './lib/ApiConfig'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ApiProvider>
    <RecoilRoot>
      <Toaster />
      <App />
    </RecoilRoot>
  </ApiProvider>
)
