import { useState } from 'react'
import Card from './components/Card.jsx'
  
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  let price= 100;
  let myobj  = {
    age:21,
    name:'test',
  };

  return (
   <>
   <h1 className = 'bg-green-400 mb-4' >tailwind test</h1>
     <Card name="test" objectname = {myobj} price={price}/>
      <Card name="test1" price={price+1}/>
   </>
  )
}

export default App
