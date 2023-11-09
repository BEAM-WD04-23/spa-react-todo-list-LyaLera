import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import AddTasksFormik from "./AddTasksFormik";
import List from "./List";
import Header from "./Header";

export default function ToDoApp() {
  const [list, setList] = useState([]);

  const fetchTasks = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SERVER_TASKS}/todos`)
      let data = await response.json()
      let tasksFromServer = data.data
      console.log(data)
      setList(tasksFromServer)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTaskToList = (textOfTask) => {
    setList([
      ...list,
      {
        name: textOfTask,
        done: false,
        id: uuidv4(),
      },
    ]);
  };

  const deleteTaskFromList = (id) => {
    let filteredList = list.filter((task) => {
      return task.id !== id;
    });
    setList(filteredList);
  };

  const changeTask = (changedTask) => {
    setList(
      list.map((task) => {
        if (task.id === changedTask.id) {
          return changedTask;
        } else {
          return task;
        }
      })
    );
  };

  const deleteAllTasks = () => {
    setList("");
  };

  console.log(list);

  return (
    <>
      <Header />
      <AddTasksFormik addTask={addTaskToList} />
      <button onClick={deleteAllTasks}>Delete all tasks</button>
      <List
        list={list}
        deleteTask={deleteTaskFromList}
        changeTask={changeTask}
      />
      <button><NavLink className="link" to='/spa-react-todo-list-LyaLera/'>Back to Home Page</NavLink></button>
    </>
  );
}
