import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const volunteerToken = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_token") : null;
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("nss_admin_token") : null;
  const volunteerUser = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_user") : null;

  let loginLabel = "Portal Login";
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
      <header className="gov-header">
        <div className="gov-header-container">
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

          {/* LEFT — OFFICIAL INSTITUTIONAL EMBLEMS */}
          <div className="gov-emblems" onClick={() => navigate("/")} role="button" tabIndex="0" title="Go to NSS RGUKT Basar Home">
            <img
              src="/RGUKT Logo.png"
              alt="RGUKT Basar Emblem"
              className="gov-rgukt-logo"
            />
            <div className="gov-emblem-divider"></div>
            <img
              src="/nsslogo.png"
              alt="National Service Scheme Official Emblem"
              className="gov-nss-logo"
            />
          </div>

          {/* CENTER — AUTHORITATIVE BILINGUAL GOVERNMENT TITLE */}
          <div className="gov-title-block" onClick={() => navigate("/")} role="button" tabIndex="0">
            <div className="gov-title-hindi">राष्ट्रीय सेवा योजना</div>
            <h1 className="gov-title-english">NATIONAL SERVICE SCHEME</h1>
            <div className="gov-unit-text">
              <strong>RGUKT Basar Unit</strong> • Rajiv Gandhi University of Knowledge Technologies, Telangana
            </div>
            <div className="gov-affiliation-text">
              Under Ministry of Youth Affairs & Sports, Government of India
            </div>
            <div className="gov-motto-strip">
              <span className="gov-motto-highlight">&ldquo;NOT ME BUT YOU&rdquo;</span>
              <span className="gov-motto-sub">&ldquo;नाहं कर्ता हरिः कर्ता&rdquo;</span>
            </div>
          </div>

          {/* RIGHT — MINISTRY & NATIONAL INITIATIVE BADGES */}
          <div className="gov-header-right">
            <div className="gov-partner-badges">
              <a
                href="https://yas.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Ministry of Youth Affairs and Sports, Govt. of India"
                className="gov-badge-link"
              >
                <img
                  src="/1024px-Ministry_of_Youth_Affairs_and_Sports.png"
                  alt="Ministry of Youth Affairs and Sports"
                  className="gov-badge-img gov-badge-ministry"
                />
              </a>

              <a
                href="https://mybharat.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="MY Bharat - Mera Yuva Bharat National Portal"
                className="gov-badge-link"
              >
                <img
                  src="/my-bharat-logo-png_seeklogo-677239.png"
                  alt="MY Bharat Portal"
                  className="gov-badge-img gov-badge-mybharat"
                />
              </a>
            </div>

            <button
              className="gov-portal-pill-btn"
              onClick={() => navigate(targetRoute)}
              title="Access Volunteer or Coordinator Portal"
            >
              <span className="pill-icon">🔐</span>
              <div className="pill-text">
                <small>Citizen / Staff</small>
                <strong>{loginLabel}</strong>
              </div>
            </button>
          </div>

          {/* MOBILE COMPACT ACTIONS (Hidden on Desktop) */}
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
              <p className="drawer-motto">&ldquo;Not Me But You&rdquo;</p>
              <span className="drawer-gov-tag">Ministry of Youth Affairs & Sports</span>
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

        {/* Drawer Volunteer Action Banner */}
        <div className="drawer-volunteer-card">
          <p className="drawer-volunteer-tag">🇮🇳 NATION BUILDING</p>
          <h4 className="drawer-volunteer-heading">Enrol as NSS Volunteer 2026</h4>
          <button
            className="drawer-join-cta"
            onClick={() => {
              navigate("/join");
              setMobileMenuOpen(false);
            }}
          >
            Register Online Now →
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
            <span className="drawer-link-icon">🏛️</span>
            <span>About NSS & Advisory</span>
          </NavLink>

          <NavLink
            to="/units"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📋</span>
            <span>NSS Units (I - IV)</span>
          </NavLink>

          <NavLink
            to="/activities"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📅</span>
            <span>Activities & Camps</span>
          </NavLink>

          <NavLink
            to="/circulars"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📑</span>
            <span>Circulars & Downloads</span>
          </NavLink>

          <NavLink
            to="/blood-donors"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🩸</span>
            <span>Emergency Blood Donors</span>
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📸</span>
            <span>Media & Photo Gallery</span>
          </NavLink>

          <NavLink
            to="/alumni"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">🎓</span>
            <span>Alumni Cadre</span>
          </NavLink>

          <NavLink
            to="/join"
            className={({ isActive }) => `drawer-link drawer-highlight-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">✍️</span>
            <span>Join as Volunteer (Apply)</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `drawer-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="drawer-link-icon">📞</span>
            <span>Contact & Helpdesk</span>
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

        {/* Drawer National Affiliations */}
        <div className="drawer-footer">
          <div className="drawer-footer-logos">
            <img src="/1024px-Ministry_of_Youth_Affairs_and_Sports.png" alt="MYAS" />
            <img src="/my-bharat-logo-png_seeklogo-677239.png" alt="MY Bharat" />
            <img src="/Election-commission-L.png" alt="ECI" />
          </div>
          <p>© 2026 NSS RGUKT Basar</p>
          <p>National Service Scheme • Ministry of Youth Affairs and Sports</p>
        </div>
      </aside>
    </>
  );
}

export default Header;
