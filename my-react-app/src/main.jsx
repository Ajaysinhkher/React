import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'



// components are made to load inside the dom from here(by appending root element in dom ), by fetching the div with id="root" from index.html:
// createRoot (container) takes a DOM element (container) and prepares it to host the React application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  
  </StrictMode>,
)


