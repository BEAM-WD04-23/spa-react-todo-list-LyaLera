import { useState } from "react";
import Tasks from "./Tasks";
import List from "./List";

let task1 = {
  name: "Learn React",
  status: false,
  id: "01",
};
let task2 = {
  name: "Cook the dinner",
  status: false,
  id: "02",
};
let task3 = {
  name: "Book a trip",
  status: false,
  id: "03",
};
let task4 = {
  name: "Read an article",
  status: false,
  id: "04",
};
let task5 = {
  name: "Do exercises",
  status: false,
  id: "05",
};

export default function ToDoApp() {
  const [task, setTask] = useState("");
  const [tasks] = useState([task1, task2, task3, task4, task5]);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(false) 

  const takeIntup = (e) => {
    setTask(e.target.value);
  };

  const addTaskToList = (clickedTask) => {
    setList([...list, clickedTask]);
    console.log(list)
  };

  const deleteTaskFromList = (indexOfTaskToCancel) => {
    let filteredList = list.filter((task, index) => {
      return index !== indexOfTaskToCancel;
    });
    setList(filteredList);
  };

  const closeTask = (clickedTask) => {
    setStatus(clickedTask.status === true)
    console.log(clickedTask.status)
  }

  return (
    <>
      <h3>Type your task to add to Your List</h3>
      <input value={task} onChange={takeIntup} />
      <p>Your task: {task}</p>
      <button onClick={() => {
                addTaskToList(task);
      }}>
            Add Task
      </button>
      <Tasks tasks={tasks} addTask={addTaskToList} />
      <List list={list} deleteTask={deleteTaskFromList} closeTask={closeTask}/>
    </>
  );
}
