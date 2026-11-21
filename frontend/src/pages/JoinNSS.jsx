import { useState } from "react";

function JoinNSS() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "Computer Science & Engineering",
    year: "E1",
    phone: "",
    email: "",
    unit: "Any Unit",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [registeredUser, setRegisteredUser] = useState(null);

  const branches = [
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Electrical & Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Metallurgical & Materials Engineering",
    "Pre-University Course (PUC)",
  ];

  const years = ["PUC-1", "PUC-2", "E1 (1st Year)", "E2 (2nd Year)", "E3 (3rd Year)", "E4 (4th Year)"];

  const units = [
    "Any Unit",
    "Unit I - Environment & Cleanliness Drives",
    "Unit II - Health, Well-being & Blood Donation",
    "Unit III - Rural Literacy & School Outreach",
    "Unit IV - Social Awareness & National Building",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "You have successfully registered as an NSS Volunteer!",
        });
        setRegisteredUser(data.data);
        setFormData({
          name: "",
          rollNumber: "",
          branch: "Computer Science & Engineering",
          year: "E1",
          phone: "",
          email: "",
          unit: "Any Unit",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to register. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error occurred. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 24px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header Banner */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "3px",
            color: "#174a7e",
            textTransform: "uppercase",
          }}
        >
          National Service Scheme • RGUKT Basar
        </span>
        <h1
          style={{
            fontSize: "36px",
            color: "#174a7e",
            margin: "12px 0 16px",
            fontWeight: "700",
          }}
        >
          Join NSS as a Volunteer
        </h1>
        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            color: "#4a5568",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Be a part of a vibrant community of change-makers dedicated to serving society,
          developing leadership, and embodying the spirit of “Not Me, But You”.
        </p>
      </div>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "36px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 6px 18px rgba(23, 74, 126, 0.08)",
        }}
      >
        {status.message && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "8px",
              marginBottom: "24px",
              backgroundColor: status.type === "success" ? "#def7ec" : "#fde8e8",
              color: status.type === "success" ? "#03543f" : "#9b1c1c",
              border: `1px solid ${status.type === "success" ? "#bcf0da" : "#f8b4b4"}`,
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <strong>{status.type === "success" ? "✓ Success: " : "✕ Error: "}</strong>
            {status.message}
          </div>
        )}

        {registeredUser && (
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "28px",
              color: "#166534",
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: "17px", color: "#15803d" }}>
              Registration Card
            </h3>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Volunteer Name:</strong> {registeredUser.name}
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Roll Number:</strong> {registeredUser.rollNumber}
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Branch & Year:</strong> {registeredUser.branch} ({registeredUser.year})
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Allocated Preference:</strong> {registeredUser.unit}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Row 1: Name and Roll Number */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
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
              <label htmlFor="rollNumber" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                RGUKT ID / Roll Number *
              </label>
              <input
                id="rollNumber"
                type="text"
                name="rollNumber"
                required
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="e.g. B210123"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  textTransform: "uppercase",
                }}
              />
            </div>
          </div>

          {/* Row 2: Branch and Year */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <div>
              <label htmlFor="branch" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Department / Branch *
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  backgroundColor: "#ffffff",
                }}
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Year of Study *
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  backgroundColor: "#ffffff",
                }}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Email and Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <div>
              <label htmlFor="email" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="rollno@rgukt.ac.in"
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
              <label htmlFor="phone" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Mobile Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
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
          </div>

          {/* Row 4: Preferred Unit */}
          <div>
            <label htmlFor="unit" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
              Preferred Unit / Area of Interest
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "6px",
                border: "1px solid #cbd5e0",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
              }}
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Row 5: Motivation */}
          <div>
            <label htmlFor="message" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
              Why do you want to join NSS? (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your enthusiasm, past volunteering, or skills you wish to contribute..."
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "6px",
                border: "1px solid #cbd5e0",
                fontSize: "14px",
                boxSizing: "border-box",
                resize: "vertical",
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
              padding: "14px 28px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "8px",
              transition: "background-color 0.2s",
            }}
          >
            {loading ? "Registering..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinNSS;
