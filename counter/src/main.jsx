import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* calling the <App/> will make react to create a virtual dom using createRoot method */}
  </StrictMode>,
)


// <App />  ->calling it will under the hood work like:     React.createElement(App)
// on calling teh <App/> this will be generated(a jsx object).
//{
//   type: App,  // reference to your function component
//   props: {},  // no props were passed to <App />
//   key: null,
//   ref: null,
//   __mark: "ReactElement" // used internally by React
//  }


