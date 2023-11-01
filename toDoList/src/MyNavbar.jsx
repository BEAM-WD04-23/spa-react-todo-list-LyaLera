import { Link } from "react-router-dom"

export default function MyNavbar() {
  return (
    <>
    <nav>
        <div className="nav-div">
          <Link className="home link" to="/">Home</Link>
        </div>
        <div className="nav-div">
          <Link className="link" to="/ToDoApp">My ToDo List</Link>
        </div>
        <div className="nav-div">
          <Link className="link" to="/Meal">A Meal to cook today</Link>
        </div>
    </nav>
    <h2>Do not know what to do?</h2>
    <img width={"300px"} src="https://cdn.pixabay.com/photo/2019/01/17/13/55/cat-3937859_1280.jpg" alt="bored cat" />
    <p>Check your ToDo list or cook a random Meal:)</p>
    </>
  );
}
