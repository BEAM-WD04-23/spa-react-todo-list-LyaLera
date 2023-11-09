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
      setList(tasksFromServer)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const postTask = async (newTask) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SERVER_TASKS}/todos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
      })
      if(response.status === 201) {
        alert("New task was added")
        console.log("Task successfully was added to database")
      } else {
        let error = new Error("Could not add task to database")
        throw error
      }
    } catch(error) {
      console.log(error)
    }
  }

  const putEditedTask = async (updatedTask) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SERVER_TASKS}/todos/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      })
      if(response.status === 200) {
        alert("Task was successfully updated")
        console.log("Task successfully edited in the database")
      } else {
        let error = new Error("Could not edit task in the database")
        throw error
      }
    } catch(error) {
      console.log(error)
    }
  }

  const deleteTaskInServer = async (id) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SERVER_TASKS}/todos/${id}`, {
        method: "DELETE"
      })
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const addTaskToList = (textOfTask) => {
    const newTask = {
      name: textOfTask,
      done: false,
      id: uuidv4(),
    }
    setList([...list, newTask])
    postTask(newTask)
  };

  const deleteTaskFromList = (id) => {
    let filteredList = list.filter((task) => {
      return task.id !== id;
    });
    setList(filteredList);
    deleteTaskInServer(id)
  };

  const changeTask = (changedTask) => {
    let updatedTask = list.map((task) => {
      if(task.id === changedTask.id) {
        return changedTask;
      } else {
        return task
      }
    })
    setList(updatedTask)
    putEditedTask(updatedTask)
    // setList(
    //   list.map((task) => {
    //     if (task.id === changedTask.id) {
    //       return changedTask;
    //     } else {
    //       return task;
    //     }
    //   })
    // );
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
