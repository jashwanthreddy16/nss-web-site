import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/about">About Us</NavLink>

        <NavLink to="/activities">Activities / Events</NavLink>

        <NavLink to="/gallery">Photo Gallery</NavLink>

        <NavLink to="/units">Units</NavLink>

        <NavLink to="/alumni">Alumni</NavLink>

        <NavLink to="/join">Join NSS</NavLink>

        <NavLink to="/contact">Contact Us</NavLink>

        <NavLink to="/login">Portal Login</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
