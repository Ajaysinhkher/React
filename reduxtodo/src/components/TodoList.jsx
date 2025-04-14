import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // Get todos from Redux store
  const todos = useSelector((state) => state.todos);
  console.log("todos", todos);
  


  return (
    <div className="flex flex-col gap-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
