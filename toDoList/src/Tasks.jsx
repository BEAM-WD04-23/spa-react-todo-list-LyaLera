export default function List({ tasks, addTask }) {
  return (
    <>
      <h3>You can choose tasks from here:</h3>
      {tasks.map((task, index) => {
        return (
          <div key={index} style={{ display: "flex", gap: "15px" }}>
            <p>{task.name}</p>
            <button
              onClick={() => {
                addTask(task);
              }}
            >
              Add Task
            </button>
          </div>
        );
      })}
    </>
  );
}
