import { NavLink } from "react-router-dom"

export default function MyNavbar() {
  return (
    <nav>
        <div className="nav-div">
          <NavLink className="home link" to="/spa-react-todo-list-LyaLera/">Home</NavLink>
        </div>
        <div className="nav-div">
          <NavLink className="link" to="/spa-react-todo-list-LyaLera/ToDoApp">My ToDo List</NavLink>
        </div>
        <div className="nav-div">
          <NavLink className="link" to="/spa-react-todo-list-LyaLera/Meal">A Meal to cook today</NavLink>
        </div>
    </nav>
  );
}
