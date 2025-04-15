import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../features/modal/modalSlice';
import groupReducer from '../features/groupSlice';
import expenseReducer from '../features/expenseSlice';


export const store = configureStore({
    reducer: {
      modal: modalReducer,
      group: groupReducer,
      expense:expenseReducer,
    },
});

