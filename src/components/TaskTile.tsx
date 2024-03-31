import React, { useEffect, useState } from "react";
import { Task } from "./ShowTask";
import { MODAL, priorityArr } from "./CreateTask";

export const TaskTile: React.FC<{ taskDetail: Task }> = ({ taskDetail }) => {
  return (
    <>
      <div className="m-4 h-64 w-64 rounded-lg bg-white p-2 hover:bg-slate-400">
        <div className="relative h-4/6 overflow-auto rounded-lg bg-slate-100 p-2 ">
          {" "}
          <p>Hi there {taskDetail.description}</p>
        </div>
        <div className="pt-2 hover:cursor-pointer">
          {" "}
          {taskDetail.priority ?? "Priority Not Assigned"}
        </div>
        <div className="pt-2">
          {" "}
          {taskDetail.deadline.toISOString().slice(0, 10) ??
            "No Dealine Available"}
        </div>
      </div>
    </>
  );
};
