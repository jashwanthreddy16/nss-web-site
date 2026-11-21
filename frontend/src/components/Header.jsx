import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const volunteerToken = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_token") : null;
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("nss_admin_token") : null;
  const volunteerUser = typeof window !== "undefined" ? localStorage.getItem("nss_volunteer_user") : null;

  let loginLabel = "Login";
  let targetRoute = "/login";

  if (volunteerToken && volunteerUser) {
    try {
      const parsed = JSON.parse(volunteerUser);
      loginLabel = `👤 ${parsed.name ? parsed.name.split(" ")[0] : "Volunteer"}`;
      targetRoute = "/volunteer/dashboard";
    } catch {
      loginLabel = "My Portal";
      targetRoute = "/volunteer/dashboard";
    }
  } else if (adminToken) {
    loginLabel = "🛡️ Admin Portal";
    targetRoute = "/admin";
  }

  return (
    <header className="header">

      {/* LEFT — INSTITUTION LOGOS */}
      <div className="header-logos">
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
      <div className="header-title">
        <h1>National Service Scheme</h1>
        <h2>RGUKT Basar</h2>
        <p>“Not Me But You”</p>
      </div>


      {/* RIGHT — WEBSITE INFORMATION */}
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

    </header>
  );
}

export default Header;
