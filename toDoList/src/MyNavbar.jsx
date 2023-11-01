import { Link } from "react-router-dom"

export default function MyNavbar() {
  return (
    <nav>
      <div className="home">
        <Link to="/">Home</Link>
      </div>
      <div className="todolist">
        <Link to="/ToDoApp">My ToDo List</Link>
      </div>
      <div className="meal">
        <Link to="/Meal">A Meal to cook today</Link>
      </div>
    </nav>
  );
}
