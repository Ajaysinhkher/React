import { createSlice } from "@reduxjs/toolkit";



const modalSlice  = createSlice({
    name:'modal',
    initialState: {
        showAddGroupModal: false,
        showAddExpenseModal: false,
    },

      reducers: {
        openAddGroupModal: (state) => {
          state.showAddGroupModal = true;
        },
        closeAddGroupModal: (state) => {
          state.showAddGroupModal = false;
        },
        openAddExpenseModal: (state) => {
          state.showAddExpenseModal = true;
        },
        closeAddExpenseModal: (state) => {
          state.showAddExpenseModal = false;
        },
    },
})

export const {openAddGroupModal, closeAddGroupModal, openAddExpenseModal, closeAddExpenseModal} = modalSlice.actions;
export default modalSlice.reducer;