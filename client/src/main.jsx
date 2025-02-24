import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './context/UserProvider.jsx'
import TypeProvider from './context/TypeProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TypeProvider>
        <App />
      </TypeProvider>
    </UserProvider>
  </StrictMode>,
)
