import { Link, useLocation } from "react-router-dom";

export default function Policies() {
  const location = useLocation();
  const path = location.pathname;

  let activeSection = "privacy";
  if (path === "/disclaimer") activeSection = "disclaimer";
  if (path === "/website-policies") activeSection = "policies";

  return (
    <div className="responsive-page-container">
      <div className="responsive-page-header">
        <span className="responsive-page-eyebrow">National Service Scheme • RGUKT Basar</span>
        <h1 className="responsive-page-title">Institutional Policies & Guidelines</h1>
        <p className="responsive-page-subtitle">
          Official policies governing NSS volunteer registration, website usage, data protection, and university guidelines.
        </p>
      </div>

      {/* Policy Selector Tabs */}
      <div className="filter-pills-scroll" style={{ justifyContent: "center", marginBottom: "30px" }}>
        <Link
          to="/privacy"
          className={`filter-pill-btn ${activeSection === "privacy" ? "active" : ""}`}
          style={{ textDecoration: "none" }}
        >
          🔒 Privacy Policy
        </Link>
        <Link
          to="/disclaimer"
          className={`filter-pill-btn ${activeSection === "disclaimer" ? "active" : ""}`}
          style={{ textDecoration: "none" }}
        >
          ⚖️ Disclaimer
        </Link>
        <Link
          to="/website-policies"
          className={`filter-pill-btn ${activeSection === "policies" ? "active" : ""}`}
          style={{ textDecoration: "none" }}
        >
          📋 Website & Volunteer Policies
        </Link>
      </div>

      {/* Policy Content Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "clamp(24px, 5vw, 42px)",
          border: "1px solid #e2e8f0",
          boxShadow: "0 6px 18px rgba(23, 74, 126, 0.08)",
          lineHeight: "1.75",
          color: "#334155",
        }}
      >
        {activeSection === "privacy" && (
          <div>
            <h2 style={{ color: "#174a7e", marginTop: 0, fontSize: "24px" }}>Privacy Policy</h2>
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p>
              The National Service Scheme (NSS) Cell at Rajiv Gandhi University of Knowledge Technologies (RGUKT) Basar
              is committed to protecting the privacy and personal data of students, faculty, volunteers, and visitors
              who interact with our web portal.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>1. Information Collected</h3>
            <p>
              When students register as NSS volunteers or contact us, we collect institutional information including student name,
              RGUKT ID (Roll Number), academic branch, year of study, institutional email, phone number, and unit preferences.
              This information is used strictly for NSS activity tracking, certificate issuance, and service hour records.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>2. Purpose & Usage</h3>
            <p>
              Information collected is never sold, leased, or shared with third-party commercial organizations. Data is exclusively
              used by RGUKT Basar Programme Officers and University Administration for:
            </p>
            <ul>
              <li>Managing attendance for volunteer camps, plantation drives, and social welfare projects.</li>
              <li>Compiling official NSS reports for the Ministry of Youth Affairs and Sports (MYAS), Government of India.</li>
              <li>Generating verifiable Digital Volunteer ID Cards and Certificates of Merit.</li>
            </ul>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>3. Data Security</h3>
            <p>
              All volunteer accounts, passwords, and inquiries are protected using modern cryptographic hashing (bcrypt)
              and secure JSON Web Tokens. Access to student information is restricted to authorized NSS programme coordinators.
            </p>
          </div>
        )}

        {activeSection === "disclaimer" && (
          <div>
            <h2 style={{ color: "#174a7e", marginTop: 0, fontSize: "24px" }}>Institutional Disclaimer</h2>
            <p>
              The content published on this website is for informational, educational, and official community service purposes
              for the students and faculty of RGUKT Basar and the wider public.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>1. Accuracy of Information</h3>
            <p>
              While every effort is made to maintain accurate and up-to-date schedules for blood donation camps, village outreach drives,
              and academic service hour matrices, dates and venues may be subject to operational changes. Volunteers are advised to verify
              announcements posted on the campus Student Activity Center (SAC) notice boards or official university circulars.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>2. External Affiliations & Links</h3>
            <p>
              This website provides links to external government and institutional bodies including MY Bharat, the Ministry of Youth Affairs
              and Sports (nss.gov.in), and the main RGUKT Basar website. NSS RGUKT Basar does not control the content or availability
              of external domains.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>3. Photographic Media</h3>
            <p>
              Photographs featured in our gallery represent genuine community drives, cleanliness campaigns, and student rallies conducted
              by NSS RGUKT Basar volunteers. Media is shared in the spirit of celebrating selfless service and inspiring civic duty.
            </p>
          </div>
        )}

        {activeSection === "policies" && (
          <div>
            <h2 style={{ color: "#174a7e", marginTop: 0, fontSize: "24px" }}>Website & Volunteer Code of Conduct</h2>
            <p>
              NSS is founded on the noble ideal of <em>“Not Me, But You”</em>. All enrolled volunteers and portal users agree to uphold
              the university’s standards of civic discipline and responsibility.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>1. Volunteer Service Obligations</h3>
            <ul>
              <li>Every enrolled volunteer must complete a minimum of <strong>120 service hours per year</strong> across regular drives and annual special rural camps.</li>
              <li>Volunteers must wear the official NSS badge during all sanctioned outreach rallies and community interactions.</li>
              <li>Attendance and participation are tracked digitally; volunteers can monitor their logged hours in their digital dashboard.</li>
            </ul>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>2. Digital ID Card Authenticity</h3>
            <p>
              The Digital Volunteer ID Card issued through this portal is official university property. Tampering with roll numbers,
              misrepresenting service hours, or misusing credentials is strictly prohibited under RGUKT disciplinary statutes.
            </p>

            <h3 style={{ color: "#174a7e", marginTop: "24px" }}>3. Questions & Cell Contact</h3>
            <p>
              For grievances or clarification regarding service credits, write to us at{" "}
              <a href="mailto:nss@rgukt.ac.in" style={{ color: "#174a7e", fontWeight: "600" }}>
                nss@rgukt.ac.in
              </a>{" "}
              or visit the NSS Cell office at the Student Activity Center (SAC), RGUKT Basar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
