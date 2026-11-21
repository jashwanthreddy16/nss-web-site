import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/about">About Us</NavLink>

        <NavLink to="/activities">Activities / Events</NavLink>

        <NavLink to="/units">Units</NavLink>

        <NavLink to="/alumni">Alumni</NavLink>

        <NavLink to="/contact">Contact Us</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
