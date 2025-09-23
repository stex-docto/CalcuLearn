import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UI_Provider } from '@/ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UI_Provider>
      <App />
    </UI_Provider>
  </React.StrictMode>
)
