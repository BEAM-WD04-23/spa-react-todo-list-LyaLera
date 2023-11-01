import { NavLink } from "react-router-dom"

export default function MyNavbar() {
  return (
    <nav>
        <div className="nav-div">
          <NavLink className="home link" to="/">Home</NavLink>
        </div>
        <div className="nav-div">
          <NavLink className="link" to="/ToDoApp">My ToDo List</NavLink>
        </div>
        <div className="nav-div">
          <NavLink className="link" to="/Meal">A Meal to cook today</NavLink>
        </div>
    </nav>
  );
}
