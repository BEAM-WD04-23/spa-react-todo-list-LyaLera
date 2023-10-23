import { useState } from "react";

export default function AddTasks({ addTask }) {
  const [task, setTask] = useState("");
  
  return (
    <>
      <h3>Type your task to add to Your List</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        setTask("")
        addTask(task)
      }}>
      <input pattern="[A-Za-z0-9]{2,60}" value={task} onChange={e => setTask(e.target.value)} />
      <button 
        disabled={task.length === 0}>
            Add Task
      </button>
      </form>
    </>
  );
}
