import React from 'react'
import { useDispatch } from 'react-redux';

const TodoItem = ({ todo }) => {

  const dispatch = useDispatch();

  // on delete dipsatch the action to delete the todo:
  // action creator and dispatched
  const OnDelete = (id)=>{
    return dispatch({
      type:"todos/deleteTodo",
      payload:id,
    })
  }

  // action creator and dispatched
  const onComplete = (id)=>{
    return dispatch({
      type:"todos/completeTodo",
      payload:id,
    })
  }

  
  return (
    <div className='flex items-center justify-between border-b-2 border-gray-300 py-2 px-2 rounded-md bg-[#1c3b57]'>
      <div className="flex items-center">
        <input type="checkbox" className='mr-2' checked={todo.completed} onChange={()=>onComplete(todo.id)} />
        <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.item}
          {console.log(todo)}
        </span>
      </div>
      <button onClick={()=>OnDelete(todo.id)} className='bg-red-500 text-white rounded-md px-4 py-1'>Delete</button>
     
    </div>
  );
};

export default TodoItem;
