import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const volunteerToken = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_token") : null;
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("nss_admin_token") : null;
  const volunteerUser = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_user") : null;

  let loginLabel = "Login";
  let targetRoute = "/login";
  let userFirstName = "";

  if (volunteerToken && volunteerUser) {
    try {
      const parsed = JSON.parse(volunteerUser);
      userFirstName = parsed.name ? parsed.name.split(" ")[0] : "Volunteer";
      loginLabel = `👤 ${userFirstName}`;
      targetRoute = "/volunteer/dashboard";
    } catch {
      loginLabel = "My Portal";
      targetRoute = "/volunteer/dashboard";
    }
  } else if (adminToken) {
    loginLabel = "🛡️ Admin Portal";
    targetRoute = "/admin";
  }

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="header">
        {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* LEFT — INSTITUTION LOGOS */}
        <div className="header-logos" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src="/RGUKT Logo.png"
            alt="National Service Scheme"
            className="nss-logo"
          />

          <div className="logo-divider"></div>

          <img
            src="/nsslogo.png"
            alt="RGUKT Basar"
            className="rgukt-logo"
          />
        </div>

        {/* CENTER — NSS TITLE */}
        <div className="header-title" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <h1>National Service Scheme</h1>
          <h2>RGUKT Basar</h2>
          <p>“Not Me But You”</p>
        </div>

        {/* RIGHT — WEBSITE STATS & DESKTOP LOGIN */}
        <div className="header-actions">
          <div className="stat">
            <span>👁</span>
            <div>
              <strong>1,245</strong>
              <small>Views</small>
            </div>
          </div>

          <div className="stat">
            <span>👥</span>
            <div>
              <strong>856</strong>
              <small>Visitors</small>
            </div>
          </div>

          <button
            className="login-btn"
            onClick={() => navigate(targetRoute)}
            title="Sign in to Volunteer or Admin Portal"
          >
            {loginLabel}
          </button>
        </div>

        {/* MOBILE COMPACT ACTION BUTTONS (Hidden on Desktop) */}
        <div className="mobile-header-actions">
          <button
            className="mobile-join-btn"
            onClick={() => navigate("/join")}
            title="Join NSS as a Volunteer"
          >
            Join NSS
          </button>
          <button
            className="mobile-avatar-btn"
            onClick={() => navigate(targetRoute)}
            title={loginLabel}
          >
            {userFirstName ? userFirstName[0] : "👤"}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-branding">
            <img src="/nsslogo.png" alt="NSS Logo" className="drawer-logo" />
            <div>
              <h3 className="drawer-title">NSS RGUKT Basar</h3>
              <p className="drawer-motto">“Not Me But You”</p>
            </div>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer Volunteer Banner */}
        <div className="drawer-volunteer-card">
          <p className="drawer-volunteer-tag">BE THE CHANGE</p>
          <h4 className="drawer-volunteer-heading">Join 400+ NSS Volunteers</h4>
          <button
            className="drawer-join-cta"
            onClick={() => {
              navigate("/join");
              setMobileMenuOpen(false);
            }}
          >
            Register as Volunteer →
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="drawer-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🏠</span>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">ℹ️</span>
            <span>About Us</span>
          </NavLink>

          <NavLink
            to="/activities"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📅</span>
            <span>Activities & Events</span>
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📸</span>
            <span>Photo Gallery</span>
          </NavLink>

          <NavLink
            to="/units"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🏛️</span>
            <span>NSS Units</span>
          </NavLink>

          <NavLink
            to="/alumni"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🎓</span>
            <span>Alumni Network</span>
          </NavLink>

          <NavLink
            to="/join"
            className={({ isActive }) => `drawer-link drawer-highlight-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🤝</span>
            <span>Join NSS (Registration)</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📞</span>
            <span>Contact Us</span>
          </NavLink>

          <div className="drawer-divider"></div>

          <NavLink
            to={targetRoute}
            className={({ isActive }) => `drawer-link drawer-portal-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🔐</span>
            <span>{loginLabel}</span>
          </NavLink>
        </nav>

        {/* Drawer Footer Info */}
        <div className="drawer-footer">
          <p>© 2026 NSS RGUKT Basar</p>
          <p>National Service Scheme • Ministry of Youth Affairs</p>
        </div>
      </aside>
    </>
  );
}

export default Header;
