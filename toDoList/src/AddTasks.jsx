export default function AddTasks({ task, addTask, takeIntup }) {
  return (
    <>
      <h3>Type your task to add to Your List</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
      <input pattern="[A-Za-z0-9]{2,60}" value={task} onChange={takeIntup} />
      <button onClick={() => {
                addTask(task);
      }}
        disabled={task.length === 0}>
            Add Task
      </button>
      </form>
    </>
  );
}
