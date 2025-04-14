
// either provide from here or else you can provide from store itself
const initialState = {
  todos: []
};

//define the reducer logic
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    //logic to add a new todo
    case "todos/addedTodo":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    //logic to delete a todo
    case "todos/deleteTodo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    // logic to complete a todo
    case "todos/completeTodo":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          } else {
            return todo;
          }
        }),
      };
    default:
      return state;
  }
};

export default todoReducer;
