import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <h2>
        <NavLink to="/">Event Management System</NavLink>
      </h2>

      <ul className="nav-pills">
        <li>
          <NavLink to="/">Events</NavLink>
        </li>
        <li>
          <NavLink to="/volunteers">Volunteers</NavLink>
        </li>
      </ul>
    </nav>
  );
};
