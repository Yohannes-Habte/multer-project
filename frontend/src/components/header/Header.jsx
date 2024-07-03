import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1>Multer</h1>
      <nav className="navbar">
        <ul className="items">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>

        <ul className="items">
          <li>
            <NavLink to={"/register"}>Sign Up</NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Log In</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
