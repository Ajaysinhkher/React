import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { openAddExpenseModal, openAddGroupModal,closeAddGroupModal,closeAddExpenseModal} from '../features/modal/modalSlice'
import AddGroupModal from './modals/AddGroupModal'
import AddExpenseModal from './modals/AddExpenseModal'


const Dashboard = () => {

  const dispatch = useDispatch()
  const group = useSelector((state)=>state.group.group)
  const expenses = useSelector((state)=>state.expense.expense)

  const {showAddGroupModal,showAddExpenseModal} = useSelector((state)=>state.modal)


  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10">
      {/* <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2> */}

      <div className="flex gap-4">
        <button onClick={()=>{dispatch(openAddGroupModal())}} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Group
        </button>
       

        <button onClick={()=>(dispatch(openAddExpenseModal()))} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Add Expense
        </button>
      </div>

      {showAddGroupModal && (<AddGroupModal onClose={() => dispatch(closeAddGroupModal())} />)}
      {showAddExpenseModal && (<AddExpenseModal onClose={() => dispatch(closeAddExpenseModal())} />)}
      {/* {console.log("Modal state:", showAddGroupModal, showAddExpenseModal)} */}

      <div className="mt-8 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Groups</h3>
        {group.length > 0 ? (
          <ul className="space-y-2">
            {group.map((grp, index) => (
              <li
                key={grp.id || index}
                className="bg-gray-100 px-4 py-2 rounded shadow-sm border border-gray-200"
              >
                {grp.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No groups added yet.</p>
        )}
      </div>
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Expenses</h3>
        {expenses.length > 0 ? (
          <ul className="space-y-2">
            {expenses.map((exp, index) => {
              console.log(exp)
              
              return (
                <li
                  key={exp.id || index}
                  className="bg-white px-4 py-3 rounded shadow-sm border border-gray-300"
                >
                  <div className="font-medium text-gray-800">{exp.name}</div>
                  <div className="text-sm text-gray-600">Group: {exp.groupId}</div>
                  <div className="text-sm text-gray-600">Amount: ₹{exp.amount}</div>
                  <div className="text-sm text-gray-500">Date: {new Date(exp.date).toLocaleDateString()}</div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No expenses added yet.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
