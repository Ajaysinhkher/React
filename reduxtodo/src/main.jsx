import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import  store  from './app/store.js'  // Make sure this path is correct

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
