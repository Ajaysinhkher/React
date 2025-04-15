import { createSlice } from "@reduxjs/toolkit";
export const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('groups')
      if (data === null) return undefined // default fallback
      return JSON.parse(data)
    } catch (err) {
      console.error('Could not load from localStorage:', err)
      return undefined
    }
  }
  
const defaultinitialState =  {
   
    group:[{
        id:1,
        name:"Home"
    }] 
}

const initialState = loadFromLocalStorage() || defaultinitialState

let count = 2


const groupSlice  = createSlice({
    name:'group',
    initialState,

      reducers: {
        AddGroup: (state,action) => {
          const group = {
            id: count++,
            name:action.payload,
          }
          state.group.push(group)

          try{
            localStorage.setItem('groups',JSON.stringify(state))
          }catch(err){
            console.log(err);
          }
        },
    },
})

export const {AddGroup} = groupSlice.actions;
export default groupSlice.reducer;