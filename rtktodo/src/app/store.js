import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

console.log(todoReducer);

export const store  = configureStore({
    // over here the reducer: expects teh reducer function and that function returns a object (here todoReducer will send back the object )
    reducer : todoReducer
})