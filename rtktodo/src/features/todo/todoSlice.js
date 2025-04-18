// similar to reducer function in reducx , we have the slices in redux toolkit.
import { createSlice , nanoid} from "@reduxjs/toolkit";

const initialState = {
    todos:[{id:1, text: "Hello World"}]
}


export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo: (state,action)=>{
            // creating new todo
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            // update the state
            state.todos.push(todo)
        },

        removeTodo: (state,action)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
        },

        toggleComplete: (state,action)=>{
            const todo = state.todos.find((todo)=> todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed;
              }
        }
    }
})

export const {addTodo, removeTodo,toggleComplete}  = todoSlice.actions  //actions exported to access it inside thee components 
export default todoSlice.reducer//reducer from slice exported to bind it within store(it can be named anything at the time of export).  