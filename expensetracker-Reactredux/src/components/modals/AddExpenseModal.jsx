import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AddExpense } from "../../features/expenseSlice";

export default function AddExpenseModal({ onClose }) {
  const [expenseName, setExpenseName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const groups = useSelector((state) => state.group.group);
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      // id: Date.now(),
      name: expenseName,
      groupId:groupId,
      amount: parseFloat(amount),
      date,
    };

    console.log("Submitting expense:", newExpense);
    dispatch(AddExpense(newExpense));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            onChange={(e) => setExpenseName(e.target.value)}
            value={expenseName}
            placeholder="Expense Name"
            className="w-full border rounded p-2"
            required
          />

          <select
            onChange={(e) => setGroupId(e.target.value)}
            value={groupId}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Amount"
            className="w-full border rounded p-2"
            required
          />

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="w-full border rounded p-2"
            required
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
