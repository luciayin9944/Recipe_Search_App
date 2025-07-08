import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/recipes" className="nav-button">RecipeSearch</Link>
        </nav>
    );
}

export default NavBar;



