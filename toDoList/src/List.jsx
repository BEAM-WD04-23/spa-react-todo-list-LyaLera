export default function List({ list, deleteTask }) {
  if (list.length === 0) {
    return <p>No tasks today!</p>;
  }
  return (
    <>
      <h3>Your To Do List for Toady</h3>
      <div>
        {list.map((task, index) => {
          return (
            <p key={index}>
              {task.name || task}
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
