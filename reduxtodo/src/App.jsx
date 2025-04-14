import React from 'react'
import TodoHeading from './components/TodoHeading'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  return (
    <div className="bg-[#0f2c43] min-h-screen py-10 px-4">
      <div className="w-full max-w-2xl mx-auto text-white">
        <TodoHeading />
        <TodoInput />
        <TodoList />
      </div>
    </div>
  )
}

export default App
