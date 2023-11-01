import "./App.css";
import ToDoApp from "./ToDoApp";
import Meal from "./Meal";
import MyNavbar from "./MyNavbar"
import NotFound from "./NotFound";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyNavbar />}/>
        <Route path="/ToDoApp" element={<ToDoApp />}/>
        <Route path="/Meal" element={<Meal />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>     
    </>
  );
}

export default App;
