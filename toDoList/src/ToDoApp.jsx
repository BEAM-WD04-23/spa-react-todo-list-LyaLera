import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTasksFormik from "./AddTasksFormik";
import List from "./List";

export default function ToDoApp() {
  const [list, setList] = useState(() => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks || "";
  });

  useEffect(() => {
    let ignore = false;

    const setListTasks = () => {
      if (!ignore) {
        localStorage.setItem("tasks", JSON.stringify(list));
        console.log("Not ignored")
      }
    };
    setListTasks();
    return () => {
      console.log("Ignored")
      ignore = true;
    };
  }, [list]);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(list))
  // }, [list])

  

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
      <AddTasksFormik addTask={addTaskToList} />
      <button onClick={deleteAllTasks}>Delete all tasks</button>
      <List
        list={list}
        deleteTask={deleteTaskFromList}
        changeTask={changeTask}
      />
    </>
  );
}
