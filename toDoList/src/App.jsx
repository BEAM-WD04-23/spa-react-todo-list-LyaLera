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
        <Route path="/beam-wd04-23.github.io" element={<Home />}/>
        <Route path="/ToDoApp" element={<ToDoApp />}/>
        <Route path="/Meal" element={<Meal />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>     
    </>
  );
}

export default App;
