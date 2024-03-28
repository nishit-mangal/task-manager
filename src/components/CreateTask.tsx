import { useState } from "react";
import { PRIORITY } from "~/constants/constants";
import { api } from "~/utils/api";

interface Task {
  description: string;
  deadline: string;
  user_id: number;
  priority: string;
}
interface UserTask {    
    name: string | null;
    id: number;    
}
const MODAL = {
  PRIORITY: "Priority",
  ASSIGN: "Assign",
};
const priorityArr = [PRIORITY.BLOCKER, PRIORITY.CRITICAL, PRIORITY.HIGH]
const defaultTaskObj = {
    description: "",
    deadline: "",
    user_id: 0,
    priority: "",
  }

export const CreateTask: React.FC<> = () => {
  const [taskData, setTaskData] = useState<Task>(defaultTaskObj);
  const { data: allUsers } = api.user.getAllUserDetail.useQuery();
  const mutation = api.task.create.useMutation()
  const [showModal, setShowModal] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string|null>("");
  
  const handleClick = (modal:string)=>{
    setShowModal(modal)
  }
  const handleOptionSelect = (priority: string) => {
    setTaskData({ ...taskData, priority });
    setShowModal(""); // Close the modal after selection
  };
  const handleUserSelect = (user:UserTask)=>{
    setTaskData({...taskData, user_id:user.id})
    setSelectedUser(user.name)
    setShowModal("");
  }
  const handleTaskData = () => {
    mutation.mutate(taskData, {
        onSuccess: (result) => {
          alert("Task Created Successfully");
          console.log(result);
          setTaskData(defaultTaskObj)
          setSelectedUser('')
        },
        onError: (error) => {
          alert('Invalid/Incomplete Input');
        },
      })
  };
  return (
    <div className="relative mt-2 flex items-center justify-center">
      <div className="absolute top-10 rounded-md bg-white p-8 shadow-sm">
        <h1 className="pb-2 text-center font-serif text-2xl">Create Task</h1>
        <div className="p-2">
          <textarea
            placeholder="Description"
            className="h-32 w-full rounded-md border border-gray-300 px-3 py-2"
            value={taskData.description}
            onChange={(e) => {
              setTaskData({ ...taskData, description: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <div className="p-2">
            <label>Deadline</label>
            <br></br>
            <input
              type="date"
              required
              value={taskData.deadline}
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              onChange={(e) => {
                setTaskData({ ...taskData, deadline: e.target.value });
              }}
            />
          </div>
          <div className="p-2">
            <label>Priority</label>
            <br></br>
            <input
              type="text"
              required
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              placeholder="Priority"
              value={taskData.priority}
              onClick={()=>handleClick(MODAL.PRIORITY)}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="p-2">
            <label>Assigned to</label>
            <br></br>
            <input
              type="text"
              required
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              placeholder="Assign task"
              value={selectedUser ?? ''}
              onClick={()=>handleClick(MODAL.ASSIGN)}
              readOnly
            />
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className={`rounded-lg px-10 py-1 font-medium text-white shadow-md bg-blue-500 hover:bg-blue-600`}
              onClick={handleTaskData}
            >
              Create Task
            </button>
          </div>
        </div>
        {showModal === MODAL.PRIORITY && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="rounded bg-white p-4 shadow-md">
              <p className="mb-2">Select Priority:</p>
              {priorityArr.map((priority)=>{
                return (
                    <button
                      className="mb-2 mr-2"
                      onClick={() => handleOptionSelect(priority)}
                    >
                      {priority}
                    </button>
                  );
              })}
            </div>
          </div>
        )}
        {showModal === MODAL.ASSIGN && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="rounded bg-white p-4 shadow-md">
              <p className="mb-2">Select User:</p>
              {allUsers?.user.map((user) => {
                return (
                  <button
                    className="mb-2 mr-2"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
