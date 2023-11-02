import "./App.css";
import ToDoApp from "./ToDoApp";
import Meal from "./Meal";
import MyNavbar from "./MyNavbar"
import NotFound from "./NotFound";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <MyNavbar />
      <Routes>
        <Route path="/spa-react-todo-list-LyaLera/" element={<Home />}/>
        <Route path="/spa-react-todo-list-LyaLera/ToDoApp" element={<ToDoApp />}/>
        <Route path="/spa-react-todo-list-LyaLera/Meal" element={<Meal />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>     
    </>
  );
}

export default App;
