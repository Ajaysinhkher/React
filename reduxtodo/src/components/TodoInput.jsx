import React, { useState } from "react";
import { useDispatch } from "react-redux";

const TodoInput = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const onInputTodo = (e) => {
    setTodo(e.target.value);
    // console.log(todo);
    
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") return;

    // on subitting form the action is dipatched to the reducer
    dispatch({
      type: "todos/addedTodo",
      payload: {
        id: Math.floor(Math.random() * 10000), // better unique ID
        item: todo,
        completed: false,
      },
    });

    setTodo("");
  };

  return (
    <div className="mb-6 flex">
      <form
        onSubmit={handleTodoSubmit}
        className="flex w-full"
      >
        <input
          type="text"
          placeholder="Enter the task for today"
          className="flex-1 px-4 py-2 rounded-md border border-yellow-400 text-white bg-transparent outline-none"
          value={todo}
          onChange={onInputTodo}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 ml-3 rounded-md font-semibold"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
