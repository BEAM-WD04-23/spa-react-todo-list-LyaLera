import { useState } from "react";
import Tasks from "./Tasks";
import List from "./List";

let task1 = {
  name: "Learn React",
  status: "open",
  id: "01",
};
let task2 = {
  name: "Cook the dinner",
  status: "open",
  id: "02",
};
let task3 = {
  name: "Book a trip",
  status: "close",
  id: "03",
};
let task4 = {
  name: "Read an article",
  status: "open",
  id: "04",
};
let task5 = {
  name: "Do exercises",
  status: "close",
  id: "05",
};

export default function ToDoApp() {
  const [task, setTask] = useState("");
  const [tasks] = useState([task1, task2, task3, task4, task5]);
  const [list, setList] = useState([]);

  const takeIntup = (e) => {
    setTask(e.target.value);
  };

  const addTaskToList = (clickedTask) => {
   console.log(list)
    setList([...list, clickedTask]);
  };

  const deleteTaskFromList = (indexOfTaskToCancel) => {
    let filteredList = list.filter((task, index) => {
      return index !== indexOfTaskToCancel;
    });
    setList(filteredList);
  };

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
      <List list={list} deleteTask={deleteTaskFromList} />
    </>
  );
}
