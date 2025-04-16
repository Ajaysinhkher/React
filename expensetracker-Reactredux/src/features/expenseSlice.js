import { createSlice } from "@reduxjs/toolkit";
export const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('expenses') 
      if (data === null) return undefined // default fallback
      // return { expense: JSON.parse(data) }
      return JSON.parse(data)

    } catch (err) {
      console.error('Could not load from localStorage:', err)
      return undefined
    }
  }

let count = 2

const defaultinitialState = {
    expense:[{
        id:1,
        name:"food",
        groupId:1,
        amount:1000,
        date:Date.now(),
    }]
}

const initialState = loadFromLocalStorage() || defaultinitialState
console.log(initialState);

const expenseSlice = createSlice({
    name:'expense',
    initialState,

    reducers:{
        AddExpense:(state,action)=>{
            const expense = {
                id: count++,
                name:action.payload.name,
                amount:action.payload.amount,
                groupId:action.payload.groupId,
                date: action.payload.date,
            }
             state.expense.push(expense)
             try{
              localStorage.setItem('expenses', JSON.stringify(state))
              }catch(err){
                console.log(err);   
              }
        },

        DeleteExpense:(state,action)=>{
          state.expense = state.expense.filter(exp => exp.id !== action.payload)
          localStorage.setItem('expenses', JSON.stringify(state))
        }

    },
})

export const {AddExpense,DeleteExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
