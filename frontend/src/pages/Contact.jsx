import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("/api/contact", {
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
          message: data.message || "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "3px",
            color: "#174a7e",
            textTransform: "uppercase",
          }}
        >
          Get in Touch
        </span>
        <h1
          style={{
            fontSize: "36px",
            color: "#174a7e",
            margin: "12px 0 16px",
            fontWeight: "700",
          }}
        >
          Contact NSS RGUKT Basar
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
          Have questions about NSS volunteer registration, community activities, or events?
          Reach out to our cell or send us a message below.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "36px",
          alignItems: "start",
        }}
      >
        {/* Contact Information */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "32px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(23, 74, 126, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              color: "#174a7e",
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            NSS Cell Office
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>
              Campus Address
            </h3>
            <p style={{ margin: 0, color: "#2d3748", lineHeight: "1.6" }}>
              National Service Scheme (NSS) Cell<br />
              Student Activity Center (SAC) / Admin Block<br />
              Rajiv Gandhi University of Knowledge Technologies (RGUKT)<br />
              Basar, Nirmal District, Telangana - 504107
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>
              Email Enquiries
            </h3>
            <p style={{ margin: 0, color: "#2d3748" }}>
              <a href="mailto:nss@rgukt.ac.in" style={{ color: "#174a7e", textDecoration: "none", fontWeight: "600" }}>
                nss@rgukt.ac.in
              </a>
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>
              Motto
            </h3>
            <p style={{ margin: 0, fontStyle: "italic", color: "#174a7e", fontWeight: "600" }}>
              “Not Me, But You”
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "32px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(23, 74, 126, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              color: "#174a7e",
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            Send a Message
          </h2>

          {status.message && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "6px",
                marginBottom: "20px",
                backgroundColor: status.type === "success" ? "#def7ec" : "#fde8e8",
                color: status.type === "success" ? "#03543f" : "#9b1c1c",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name / ID"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
                  placeholder="name@example.com"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e0",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label htmlFor="phone" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e0",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject / Query topic"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e0",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" }}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or inquiry here..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
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
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "8px",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
