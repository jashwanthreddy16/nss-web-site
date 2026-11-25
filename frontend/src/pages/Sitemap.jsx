import { Link } from "react-router-dom";

export default function Sitemap() {
  const sections = [
    {
      category: "Public Portal & Pages",
      links: [
        { title: "Home Page", path: "/", desc: "Hero banner, announcements, impact metrics, and highlights" },
        { title: "About Us", path: "/about", desc: "NSS history, university cell objectives, organization, and motto" },
        { title: "Activities & Events", path: "/activities", desc: "Interactive gallery, 21 documented service drives, and hours matrix" },
        { title: "Photo Gallery", path: "/gallery", desc: "Categorized photo library with full-screen lightbox viewing" },
        { title: "NSS Units", path: "/units", desc: "Units I, II, III & IV focus areas and Programme Officers" },
        { title: "Alumni Network", path: "/alumni", desc: "Past volunteer leaders, career trajectories, and alumni contributions" },
        { title: "Join NSS (Registration)", path: "/join", desc: "Online application form for RGUKT Basar students" },
        { title: "Contact Us", path: "/contact", desc: "NSS Cell office location, inquiries, and message form" },
      ],
    },
    {
      category: "Secure Digital Portals",
      links: [
        { title: "Multi-Role Portal Login", path: "/login", desc: "Unified authentication for volunteers and administrators" },
        { title: "Volunteer Dashboard", path: "/volunteer/dashboard", desc: "Service hours ledger and Digital Volunteer ID Card" },
        { title: "Admin Portal", path: "/admin", desc: "Content management, volunteer records, inquiries, and gallery" },
        { title: "Admin Direct Login", path: "/admin/login", desc: "Dedicated administrator credentials login" },
      ],
    },
    {
      category: "Institutional Policies & Legal",
      links: [
        { title: "Privacy Policy", path: "/privacy", desc: "Data protection standards and student record confidentiality" },
        { title: "Disclaimer", path: "/disclaimer", desc: "Accuracy of information and external link terms" },
        { title: "Website Policies", path: "/website-policies", desc: "Volunteer code of conduct and digital ID terms" },
        { title: "Complete Sitemap", path: "/sitemap", desc: "This comprehensive site index" },
      ],
    },
    {
      category: "External National Portals",
      external: true,
      links: [
        { title: "MY Bharat Official", path: "https://mybharat.gov.in/", desc: "Government of India national youth volunteering ecosystem" },
        { title: "NSS National Directorate", path: "https://nss.gov.in/", desc: "Ministry of Youth Affairs and Sports, Government of India" },
        { title: "RGUKT Basar Main Site", path: "https://www.rgukt.ac.in/", desc: "Official university web portal" },
      ],
    },
  ];

  return (
    <div className="responsive-page-container">
      <div className="responsive-page-header">
        <span className="responsive-page-eyebrow">Directory & Sitemap</span>
        <h1 className="responsive-page-title">Website Sitemap</h1>
        <p className="responsive-page-subtitle">
          An organized overview of all public sections, digital volunteer portals, policies, and national affiliations.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {sections.map((sec) => (
          <div
            key={sec.category}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "clamp(20px, 4vw, 32px)",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(23, 74, 126, 0.06)",
            }}
          >
            <h2 style={{ margin: "0 0 20px", color: "#174a7e", fontSize: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
              {sec.category}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "18px",
              }}
            >
              {sec.links.map((link) => (
                <div
                  key={link.title}
                  style={{
                    padding: "16px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {sec.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#174a7e",
                        fontWeight: "700",
                        fontSize: "15px",
                        textDecoration: "none",
                        marginBottom: "6px",
                      }}
                    >
                      {link.title} ↗
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      style={{
                        color: "#174a7e",
                        fontWeight: "700",
                        fontSize: "15px",
                        textDecoration: "none",
                        marginBottom: "6px",
                      }}
                    >
                      {link.title} →
                    </Link>
                  )}
                  <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                    {link.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
