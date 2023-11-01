import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <>
            <h3>Sorry, the page you are looking for does not exist:(</h3>
            <img width={"300px"} src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=1380&t=st=1698846138~exp=1698846738~hmac=0a3366ec814033b495d8a6550c274662fc0d2d51591349d63ecad215196816a0" alt="not found image" />
            <br />
            <button><Link className="link" to="/">Return to home page</Link></button>
        </>
    )
}