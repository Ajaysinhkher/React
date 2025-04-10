import { useState } from 'react'
import './App.css'

function App() {

// hooks will propogate the change to ui .
let [counter,setCounter] = useState(0);

const addValue = ()=>{

  setCounter(counter + 1)
  console.log('value added' , counter);
}


const removeValue = ()=>{

  if(counter >0)
  {
    setCounter(counter-1);
  }
  else{
    console.log('value cant be negative');
    
  }
 
  console.log('value removed',counter);
}

  return (
    <>
    <h1>hello Developer </h1>
    <h2>counter value: {counter}</h2>
    <button onClick={addValue}>Add Value</button>
    <br />
    <br></br>
    <button onClick={removeValue}>Remove value</button>
  </>
  
  )
}

export default App



// this is how react hooks works under the hood , on every render , it is called
/*  
const stateStore = []   // React's hidden state array
let index = 0           // Keeps track of which state hook is being called

function useState(initialValue) {
  const currentIndex = index
  stateStore[currentIndex] = stateStore[currentIndex] ?? initialValue

  function setState(newValue) {
    stateStore[currentIndex] = newValue
    renderComponent() // triggers the re-render
  }

  index++
  return [stateStore[currentIndex], setState]
}

 */