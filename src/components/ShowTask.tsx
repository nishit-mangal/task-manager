import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { TaskTile } from "./TaskTile";
import { UpdateTask } from "./UpdateTask";

export interface Task {
  id: number;
  user_id: number;
  description: string;
  deadline: Date;
  priority: string;
}
export const ShowTask: React.FC<{ userId: number }> = ({ userId }) => {
  const [allTaskData, setAllTaskData] = useState<Task[] | undefined>([
    {
      id: 0,
      user_id: 0,
      description: "",
      deadline: new Date(),
      priority: "",
    },
  ]);
  const [showUpdateTask, setShowUpdateTask] = useState<boolean>(false)
  const [taskData, setTaskData] = useState<Task>({
    id: 0,
    user_id: 0,
    description: "",
    deadline: new Date(),
    priority: "",
  })
  const { data: response } = api.task.getAllTaskForAUser.useQuery(userId ?? 0);
  const handleTileClick = (task:Task)=>{
    setTaskData(task)
    setShowUpdateTask(true)
  }
  useEffect(() => {
    if (response) setAllTaskData(response);
  }, [response]);
  return (
    <div className="flex flex-wrap items-center justify-left p-4" >
      {allTaskData?.map((task) => {
        return (          
            <div key={task.id} className="hover:bg-slate-50" onClick={()=>handleTileClick(task)}>
            <TaskTile taskDetail={task} />
            </div>
        );
      })}
      {
        showUpdateTask && <UpdateTask taskDetail={taskData} setShowUpdateTask={setShowUpdateTask}></UpdateTask>
      }
    </div>
  );
};
