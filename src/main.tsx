import React from 'react'
import ReactDOM from 'react-dom/client'

// Libraries
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
