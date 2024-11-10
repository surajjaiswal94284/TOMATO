import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StoreContextProvider from './Context/StoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  
)
