import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("nss_volunteer_token") || "");
  const [volunteer, setVolunteer] = useState(() => {
    try {
      const stored = localStorage.getItem("nss_volunteer_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login?role=volunteer");
      return;
    }

    let isMounted = true;

    // Fetch fresh profile
    fetch("/api/auth/volunteer/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("nss_volunteer_token");
          localStorage.removeItem("nss_volunteer_user");
          navigate("/login?role=volunteer");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && !data.message) {
          setVolunteer(data);
          localStorage.setItem("nss_volunteer_user", JSON.stringify(data));
        }
      })
      .catch((err) => console.error("Error loading volunteer profile:", err));

    // Fetch activities for volunteer events list
    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setActivities(data.slice(0, 5));
        }
      })
      .catch((err) => console.error("Error loading activities:", err));

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("nss_volunteer_token");
    localStorage.removeItem("nss_volunteer_user");
    setToken("");
    navigate("/login?role=volunteer");
  };

  if (!volunteer) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <p>Loading your volunteer portal...</p>
      </div>
    );
  }

  return (
    <div className="responsive-page-container">
      {/* Top Welcome Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          backgroundColor: "#174a7e",
          color: "#ffffff",
          padding: "clamp(16px, 3vw, 24px)",
          borderRadius: "10px",
          marginBottom: "24px",
          boxShadow: "0 4px 16px rgba(23, 74, 126, 0.15)",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
              color: "#93c5fd",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            NSS Volunteer Portal • RGUKT Basar
          </span>
          <h1 style={{ margin: "4px 0 0", fontSize: "24px", fontWeight: "700" }}>
            Welcome, {volunteer.name}!
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#dbeafe" }}>
            ID: <strong>{volunteer.rollNumber}</strong> • {volunteer.branch} ({volunteer.year})
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Public Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Digital Volunteer Card */}
        <div>
          <div
            style={{
              background: "linear-gradient(135deg, #174a7e 0%, #0d2e52 100%)",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 10px 25px rgba(23, 74, 126, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Watermark badge */}
            <div
              style={{
                position: "absolute",
                right: "-20px",
                bottom: "-20px",
                opacity: 0.1,
                fontSize: "140px",
              }}
            >
              🇮🇳
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <div style={{ fontSize: "16px", fontWeight: "700", letterSpacing: "1px" }}>
                  NATIONAL SERVICE SCHEME
                </div>
                <div style={{ fontSize: "12px", color: "#cbd5e1" }}>RGUKT Basar, Nirmal, Telangana</div>
              </div>
              <span
                style={{
                  backgroundColor: "#22c55e",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                {volunteer.status || "Active"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  border: "2px solid rgba(255,255,255,0.4)",
                  flexShrink: 0,
                }}
              >
                👤
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700" }}>{volunteer.name}</h2>
                <div style={{ fontSize: "14px", color: "#93c5fd", fontWeight: "600" }}>
                  ID: {volunteer.rollNumber}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "13px", lineHeight: "1.8", color: "#e2e8f0" }}>
              <div>
                <strong style={{ color: "#cbd5e1" }}>Branch:</strong> {volunteer.branch}
              </div>
              <div>
                <strong style={{ color: "#cbd5e1" }}>Academic Year:</strong> {volunteer.year}
              </div>
              <div>
                <strong style={{ color: "#cbd5e1" }}>Assigned Unit:</strong> {volunteer.unit}
              </div>
              <div>
                <strong style={{ color: "#cbd5e1" }}>Official Email:</strong> {volunteer.email}
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              <span>Motto: “Not Me But You”</span>
              <span>RGUKT NSS Cell</span>
            </div>

            <button
              onClick={() => window.print()}
              style={{
                marginTop: "16px",
                width: "100%",
                padding: "10px 16px",
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#ffffff",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              🖨️ Print / Save Digital ID Card
            </button>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#174a7e" }}>
                {volunteer.serviceHours || 24}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                Service Hours Logged
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#10b981" }}>
                Active
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                Volunteer Standing
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Events & Action Feeds */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px", color: "#174a7e" }}>
                Recent & Upcoming Service Drives
              </h3>
              <Link
                to="/activities"
                style={{ fontSize: "13px", color: "#174a7e", fontWeight: "600", textDecoration: "none" }}
              >
                View All Events →
              </Link>
            </div>

            {activities.length === 0 ? (
              <p style={{ color: "#64748b", fontSize: "14px" }}>No events available at the moment.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {activities.map((act) => (
                  <div
                    key={act._id || act.id}
                    style={{
                      padding: "14px",
                      borderRadius: "6px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0 0 4px", fontSize: "15px", color: "#1f2937" }}>
                        {act.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                        {act.date} • {act.vertical} • {act.hours} hrs
                      </p>
                    </div>
                    <span
                      style={{
                        backgroundColor: "#ebf4ff",
                        color: "#174a7e",
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 10px",
                        borderRadius: "16px",
                      }}
                    >
                      Enrolled
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Volunteer Guidelines */}
          <div
            style={{
              backgroundColor: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: "8px",
              padding: "20px",
              color: "#0369a1",
            }}
          >
            <h4 style={{ margin: "0 0 8px", fontSize: "15px" }}>Volunteer Code of Conduct</h4>
            <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", lineHeight: "1.6" }}>
              <li>Wear your NSS badge/t-shirt during all sanctioned camps and campus rallies.</li>
              <li>Commit at least 120 hours of regular service work per academic year.</li>
              <li>Attend weekly meetings organized by your Programme Officer in SAC / Unit Zone.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
