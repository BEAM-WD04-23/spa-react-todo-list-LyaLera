import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddTasks from "./AddTasks";
import List from "./List";


export default function ToDoApp() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const takeIntup = (e) => {
    setTask(e.target.value);
  };

  const addTaskToList = (text) => {
    setList([...list, {
      name: text,
      status: false,
      id: uuidv4()
    }]);
  };

  const deleteTaskFromList = (indexOfTaskToCancel) => {
    let filteredList = list.filter((task, index) => {
      return index !== indexOfTaskToCancel;
    });
    setList(filteredList);
  };

  const closeTask = (status) => {
    status === true
  }

  console.log(list)

  return (
    <>
      <AddTasks task={task} addTask={addTaskToList} takeIntup={takeIntup}/>
      <List list={list} deleteTask={deleteTaskFromList} closeTask={closeTask}/>
    </>
  );
}
