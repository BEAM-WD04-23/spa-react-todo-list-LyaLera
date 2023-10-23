export default function List({ list, deleteTask, closeTask }) {
  if (list.length === 0) {
    return <p>No tasks today!</p>;
  }
  
  return (
    <>
      <h3>Your To Do List for Toady</h3>
      <div>
        {list.map((task, index) => {
          console.log(task.status)
          return (
              <p key={index}>
              <input
                  type="checkbox"
                  onChange={closeTask(task.status)}
                  checked={closeTask(task.status)}
                />
                {task.name}
                <button
                  onClick={() => {
                    deleteTask(index);
                  }}
                >
                  Delete Task
                </button>
              </p>
          );
          
        })}
      </div>
    </>
  );
}
