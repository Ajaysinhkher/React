import  { createStore }  from 'redux';
import todoReducer from "../reducer/todoReducer";


// 🔁 Load todos from localStorage (if any)
const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('todos');
      console.log(data);
      
      return data ? JSON.parse(data) :[];
    } catch (e) {
      console.warn("Could not load from localStorage", e);
      return [];
    }
  };

// 💾 Save to localStorage
const saveToLocalStorage = (state) => {
    try {
      const storeTodo = JSON.stringify(state.todos);
      localStorage.setItem('todos', storeTodo);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

const store = createStore(todoReducer, { todos: loadFromLocalStorage() || [] });

// 📦 Subscribe to store changes:
// store.subscribe is like watchdog :It watches for any changes and then does something useful — like saving, logging, or syncing with a server.
store.subscribe(() => {
    saveToLocalStorage(store.getState());  //getstate() brings the latest updated state whenever the dispatch() action is perfirmed 
  });

export default store

// The getState() method is used to get the current state from the Redux store.