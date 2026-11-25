import { NavLink } from "react-router-dom";

function MobileBottomNav() {
  const volunteerToken = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_token") : null;
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("nss_admin_token") : null;

  let portalPath = "/login";
  let portalLabel = "Login";

  if (volunteerToken) {
    portalPath = "/volunteer/dashboard";
    portalLabel = "Dashboard";
  } else if (adminToken) {
    portalPath = "/admin";
    portalLabel = "Admin";
  }

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <NavLink
        to="/"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
        end
      >
        <span className="bottom-nav-icon">🏠</span>
        <span className="bottom-nav-label">Home</span>
      </NavLink>

      <NavLink
        to="/activities"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <span className="bottom-nav-icon">📅</span>
        <span className="bottom-nav-label">Activities</span>
      </NavLink>

      <NavLink
        to="/join"
        className={({ isActive }) => `bottom-nav-item bottom-nav-cta ${isActive ? "active" : ""}`}
      >
        <div className="cta-icon-wrapper">
          <span className="bottom-nav-icon cta-icon">🤝</span>
        </div>
        <span className="bottom-nav-label cta-label">Join NSS</span>
      </NavLink>

      <NavLink
        to="/gallery"
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <span className="bottom-nav-icon">📸</span>
        <span className="bottom-nav-label">Gallery</span>
      </NavLink>

      <NavLink
        to={portalPath}
        className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
      >
        <span className="bottom-nav-icon">👤</span>
        <span className="bottom-nav-label">{portalLabel}</span>
      </NavLink>
    </nav>
  );
}

export default MobileBottomNav;
