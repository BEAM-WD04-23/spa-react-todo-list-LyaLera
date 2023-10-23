import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddTasks from "./AddTasks";
import List from "./List";


export default function ToDoApp() {
  const [list, setList] = useState([]);

  const addTaskToList = (text) => {
    setList([...list, {
      name: text,
      done: false,
      id: uuidv4()
    }]);
  };

  const deleteTaskFromList = (id) => {
    let filteredList = list.filter((task) => {
      return task.id !== id;
    });
    setList(filteredList)
  };

  const changeTask = (changedTask) => {
    setList(list.map(task => {
      if(task.id === changedTask.id) {
        return changedTask
      } else {
        return task
      }
    }))
  }
  console.log(list)

  return (
    <>
      <AddTasks addTask={addTaskToList}/>
      <List list={list} deleteTask={deleteTaskFromList} changeTask={changeTask}/>
    </>
  );
}
