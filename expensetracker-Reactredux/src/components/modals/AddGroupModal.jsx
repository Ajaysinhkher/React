import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddGroup } from "../../features/groupSlice";

export default function AddGroupModal({ onClose }) {
    const [group, setGroup] = useState("");
    const dispatch = useDispatch();

    const addGroup = (e) => {
      e.preventDefault();
      dispatch(AddGroup(group));
      setGroup("");
      onClose();
    };
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white rounded p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add Group</h2>
  
          {/* ✅ Wrap in form and use onSubmit */}
          <form onSubmit={addGroup}>
            <input
              onChange={(e) => setGroup(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              placeholder="Group Name"
              value={group}
            />
  
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  