import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Meal() {
  const [meal, setMeal] = useState("");
//   const [img, setImg] = useState("")
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchRandomMeal() {
      try {
        setIsFetching(true);
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        if (response.status === 200) {
          const mealData = await response.json();
          if (!ignore) { 
            let randomMeal = {
                name: mealData.meals[0].strMeal,
                img: mealData.meals[0].strMealThumb
            }
            console.log(mealData.meals)
            setMeal([randomMeal.name, randomMeal.img])
            // setImg(randomMeal.img)
          }
        } else {
          setError("Something went wrong");
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }
    fetchRandomMeal();
    return () => {
      ignore = true;
    };
  }, [error.message]);

  return (
    <>
      <h3>Meal to prepare today:</h3>
      {isFetching && "...loading"}
      {error ? <p>{error}</p> : <><p>{meal[0]}</p><img src={meal[1]} width={"300px"}/><br/></>}
      <button><Link className="link" to='/spa-react-todo-list-LyaLera/'>Back to Home Page</Link></button>
    </>
  );
}
