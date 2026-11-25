import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

function Login() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "admin" ? "admin" : "volunteer";
  const [role, setRole] = useState(initialRole);

  // Volunteer login fields
  const [identifier, setIdentifier] = useState("");
  const [volunteerPassword, setVolunteerPassword] = useState("");

  // Admin login fields
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVolunteerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/volunteer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: volunteerPassword }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("nss_volunteer_token", data.token);
        localStorage.setItem("nss_volunteer_user", JSON.stringify(data.user));
        navigate("/volunteer/dashboard");
      } else {
        setError(data.message || "Invalid Roll Number or Password");
      }
    } catch {
      setError("Unable to connect to login server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("nss_admin_token", data.token);
        localStorage.setItem("nss_admin_user", JSON.stringify(data));
        navigate("/admin");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch {
      setError("Unable to connect to authentication server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px, 4vw, 40px) 14px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(23, 74, 126, 0.12)",
          padding: "clamp(22px, 5vw, 36px)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2.5px",
              color: "#174a7e",
              textTransform: "uppercase",
            }}
          >
            National Service Scheme • RGUKT Basar
          </span>
          <h1
            style={{
              fontSize: "26px",
              color: "#174a7e",
              margin: "8px 0 6px",
              fontWeight: "700",
            }}
          >
            Portal Login
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Select your account type to access your dashboard
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            backgroundColor: "#f1f5f9",
            padding: "6px",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setRole("volunteer");
              setError("");
            }}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: role === "volunteer" ? "#ffffff" : "transparent",
              color: role === "volunteer" ? "#174a7e" : "#64748b",
              fontWeight: role === "volunteer" ? "700" : "500",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: role === "volunteer" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            🎓 Volunteer Login
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: role === "admin" ? "#ffffff" : "transparent",
              color: role === "admin" ? "#174a7e" : "#64748b",
              fontWeight: role === "admin" ? "700" : "500",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: role === "admin" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            🛡️ Admin Login
          </button>
        </div>

        {/* Error Feedback */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              backgroundColor: "#fff5f5",
              color: "#c53030",
              border: "1px solid #fed7d7",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* 1. VOLUNTEER LOGIN FORM */}
        {role === "volunteer" ? (
          <form onSubmit={handleVolunteerLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label
                htmlFor="volunteer-id"
                style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}
              >
                RGUKT ID / Roll Number (or College Email)
              </label>
              <input
                id="volunteer-id"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. B210123 or b210123@rgukt.ac.in"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="volunteer-pw"
                style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}
              >
                Password
              </label>
              <input
                id="volunteer-pw"
                type="password"
                required
                value={volunteerPassword}
                onChange={(e) => setVolunteerPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
              <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
                Tip: Default password is your Roll Number (e.g. <code>B210123</code>).
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#174a7e",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "13px 20px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "6px",
              }}
            >
              {loading ? "Signing in..." : "Sign In to Volunteer Portal"}
            </button>

            <div style={{ textAlign: "center", marginTop: "8px", fontSize: "14px", color: "#64748b" }}>
              Not registered as a volunteer yet?{" "}
              <Link to="/join" style={{ color: "#174a7e", fontWeight: "600", textDecoration: "none" }}>
                Join NSS here
              </Link>
            </div>
          </form>
        ) : (
          /* 2. ADMIN LOGIN FORM */
          <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label
                htmlFor="admin-email"
                style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}
              >
                Administrator Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@rgukt.ac.in"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#174a7e",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "13px 20px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "6px",
              }}
            >
              {loading ? "Signing in..." : "Sign In to Admin Portal"}
            </button>
          </form>
        )}

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link to="/" style={{ color: "#64748b", fontSize: "13px", textDecoration: "none" }}>
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
