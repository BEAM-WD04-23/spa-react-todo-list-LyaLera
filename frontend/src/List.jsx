import { useState } from "react";

export default function List({ list, deleteTask, changeTask }) {

  if (list.length === 0) {
    return <p>No tasks today!</p>;
  }

  return (
    <>
      <h3>Your To Do List for Toady</h3>
      <div>
        {list.map((task) => {
          return (
            <p key={task.id}>
              <Task task={task}
                changeTask={changeTask}
                deleteTask={deleteTask} 
              />
            </p>
          );
        })}
      </div>
    </>
  );
  
}

function Task({ task, changeTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  let listContent;
  if (isEditing) {
    listContent = (
      <>
        <input
          value={task.name}
          onChange={(e) => {
            changeTask({ ...task, name: e.target.value });
          }}
        />
        <button onClick={() => {setIsEditing(false)}}>Save</button>
      </>
    );
  } else {
    listContent = (  
      <>
        {task.name}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    )
  }

  return (
    <label>
      <input type="checkbox"
      checked={task.done}
      onChange={e => {
        changeTask({...task, done: e.target.checked})
      }} />
      {listContent}
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </label>
  )
}
