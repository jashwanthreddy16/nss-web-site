import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="responsive-page-container" style={{ textAlign: "center", padding: "60px 20px 80px" }}>
      <div
        style={{
          maxWidth: "540px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "clamp(30px, 6vw, 50px) 24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(23, 74, 126, 0.08)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "12px" }}>🧭</div>
        <div
          style={{
            fontSize: "clamp(56px, 12vw, 84px)",
            fontWeight: "800",
            color: "#174a7e",
            lineHeight: 1,
            letterSpacing: "-2px",
            marginBottom: "8px",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: "clamp(20px, 5vw, 26px)",
            color: "#1f2937",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            lineHeight: "1.6",
            marginBottom: "28px",
          }}
        >
          The page or resource you are looking for may have been updated, moved, or does not exist.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#174a7e",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(23, 74, 126, 0.25)",
            }}
          >
            🏠 Return Home
          </Link>

          <Link
            to="/activities"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f1f5f9",
              color: "#174a7e",
              border: "1px solid #cbd5e1",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            📅 Explore Activities
          </Link>
        </div>

        <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
            Need help? <Link to="/contact" style={{ color: "#174a7e", fontWeight: "600" }}>Contact NSS Cell</Link> or view our <Link to="/sitemap" style={{ color: "#174a7e", fontWeight: "600" }}>Sitemap</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
