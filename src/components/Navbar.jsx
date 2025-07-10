import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">QuickCook</div>
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/recipes" className="nav-button">RecipeSearch</Link>
      </div>
    </nav>
  );
}

export default NavBar;


