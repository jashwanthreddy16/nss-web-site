import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function GovNavbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="gov-navbar" aria-label="Main Navigation">
      <div className="gov-navbar-container">
        <ul className="gov-nav-menu">
          {/* Home */}
          <li className="gov-nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => `gov-nav-link ${isActive ? "active" : ""}`}
              onClick={closeDropdown}
            >
              <span className="gov-nav-icon">🏠</span> Home
            </NavLink>
          </li>

          {/* About Us (Dropdown) */}
          <li
            className={`gov-nav-item has-dropdown ${activeDropdown === "about" ? "open" : ""}`}
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={closeDropdown}
          >
            <button
              type="button"
              className="gov-nav-link dropdown-toggle"
              onClick={() => toggleDropdown("about")}
              aria-expanded={activeDropdown === "about"}
            >
              🏛️ About NSS <span className="dropdown-caret">▾</span>
            </button>
            <ul className="gov-dropdown-menu">
              <li>
                <Link to="/about" onClick={closeDropdown}>
                  <strong>Overview & Genesis</strong>
                  <small>History, Objectives & Vision</small>
                </Link>
              </li>
              <li>
                <Link to="/about#motto" onClick={closeDropdown}>
                  <strong>Motto & Emblem</strong>
                  <small>Konark Wheel & &quot;Not Me But You&quot;</small>
                </Link>
              </li>
              <li>
                <Link to="/about#advisory" onClick={closeDropdown}>
                  <strong>Advisory Committee</strong>
                  <small>University Leadership & Program Officers</small>
                </Link>
              </li>
              <li>
                <Link to="/alumni" onClick={closeDropdown}>
                  <strong>Alumni Cadre</strong>
                  <small>Distinguished NSS Achievers</small>
                </Link>
              </li>
            </ul>
          </li>

          {/* NSS Units */}
          <li className="gov-nav-item">
            <NavLink
              to="/units"
              className={({ isActive }) => `gov-nav-link ${isActive ? "active" : ""}`}
              onClick={closeDropdown}
            >
              📋 NSS Units
            </NavLink>
          </li>

          {/* Activities / Events (Dropdown) */}
          <li
            className={`gov-nav-item has-dropdown ${activeDropdown === "activities" ? "open" : ""}`}
            onMouseEnter={() => setActiveDropdown("activities")}
            onMouseLeave={closeDropdown}
          >
            <button
              type="button"
              className="gov-nav-link dropdown-toggle"
              onClick={() => toggleDropdown("activities")}
              aria-expanded={activeDropdown === "activities"}
            >
              📅 Activities & Camps <span className="dropdown-caret">▾</span>
            </button>
            <ul className="gov-dropdown-menu">
              <li>
                <Link to="/activities" onClick={closeDropdown}>
                  <strong>All Activities Archive</strong>
                  <small>Chronological record of programs</small>
                </Link>
              </li>
              <li>
                <Link to="/activities?filter=camps" onClick={closeDropdown}>
                  <strong>Special Rural Camps</strong>
                  <small>7-Day village immersion programs</small>
                </Link>
              </li>
              <li>
                <Link to="/activities?filter=blood" onClick={closeDropdown}>
                  <strong>Blood Donation Drives</strong>
                  <small>Life-saving voluntary camps</small>
                </Link>
              </li>
              <li>
                <Link to="/activities?filter=environment" onClick={closeDropdown}>
                  <strong>Haritha Haram & SDGs</strong>
                  <small>Mass afforestation & green campus</small>
                </Link>
              </li>
            </ul>
          </li>

          {/* Media & Gallery */}
          <li className="gov-nav-item">
            <NavLink
              to="/gallery"
              className={({ isActive }) => `gov-nav-link ${isActive ? "active" : ""}`}
              onClick={closeDropdown}
            >
              📸 Media Gallery
            </NavLink>
          </li>

          {/* Circulars & Downloads */}
          <li className="gov-nav-item">
            <NavLink
              to="/circulars"
              className={({ isActive }) => `gov-nav-link ${isActive ? "active" : ""}`}
              onClick={closeDropdown}
            >
              📑 Circulars
            </NavLink>
          </li>

          {/* Emergency Blood Directory */}
          <li className="gov-nav-item">
            <NavLink
              to="/blood-donors"
              className={({ isActive }) => `gov-nav-link ${isActive ? "active" : ""}`}
              onClick={closeDropdown}
            >
              🩸 Blood Donors
            </NavLink>
          </li>

          {/* Contact Us */}
          <li className="gov-nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => `gov-nav-link ${isActive ? "active" : ""}`}
              onClick={closeDropdown}
            >
              📞 Contact
            </NavLink>
          </li>
        </ul>

        {/* Right CTA / Portal Quick Access */}
        <div className="gov-nav-actions">
          <Link to="/join" className="gov-nav-join-cta">
            <span className="join-cta-icon">✍️</span>
            <span>Join NSS 2026</span>
          </Link>

          <Link to="/login" className="gov-nav-portal-btn" title="Sign into Volunteer or Admin portal">
            <span className="portal-icon">🔐</span>
            <span>Portals</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default GovNavbar;
