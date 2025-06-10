import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/index.css'
import Home from './pages/Home'
import Snackbar from './components/common/Snackbar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
    <Snackbar />
  </React.StrictMode>,
)
