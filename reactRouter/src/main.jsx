import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router";
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github,{githubInfoLoader}  from './components/Github/Github.jsx'
import './App.css'

// making a router using createBrowserRouter method :
const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About},
      { path: "contact", Component: Contact},
      { path:"user/:userId", Component:User} ,  //parameter from url  fetch it using useParams method
      {path:"github", 
      Component:Github,
      loader: githubInfoLoader,     //laoder is used for optimizing the dta fetch (it runs before useeffect)
    },
      
    ],
    
  },
 
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
) 

// RouterProvider
// In React Router v6 and later, RouterProvider is used to render your application's routes and provide access to the routing context to components within your application. It takes a router object (created with createBrowserRouter or similar) as a prop and makes it available to components using hooks like useNavigate and useLocation. 
// Purpose: The RouterProvider is the component that makes the routing context available to your applicatio