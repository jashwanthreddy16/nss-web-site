import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px rgba(23, 74, 126, 0.12)",
          padding: "36px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#174a7e",
              textTransform: "uppercase",
            }}
          >
            NSS RGUKT Basar
          </span>
          <h1
            style={{
              fontSize: "24px",
              color: "#174a7e",
              margin: "8px 0 6px",
              fontWeight: "700",
            }}
          >
            Admin Portal Login
          </h1>
          <p style={{ margin: 0, color: "#718096", fontSize: "14px" }}>
            Sign in to manage activities, volunteers, and gallery
          </p>
        </div>

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

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label
              htmlFor="admin-email"
              style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "8px",
            }}
          >
            {loading ? "Signing in..." : "Sign In to Admin Portal"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link to="/" style={{ color: "#718096", fontSize: "13px", textDecoration: "none" }}>
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
