import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CasesProvider } from './context/CasesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css' // ✅ must be here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CasesProvider>
        <App />
      </CasesProvider>
    </AuthProvider>
  </React.StrictMode>
)
