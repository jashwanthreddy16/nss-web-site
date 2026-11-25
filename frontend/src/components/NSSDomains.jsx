import { Link } from "react-router-dom";

function NSSDomains() {
  const domains = [
    {
      id: "education",
      icon: "🎓",
      title: "Educational Outreach & Digital Literacy",
      hindi: "शिक्षा एवं डिजिटल साक्षरता",
      color: "#2563eb",
      badge: "Core Vertical",
      desc: "Empowering rural primary and high school students with weekly tutoring, STEM experiments, computer fundamentals, and career guidance sessions.",
      highlights: ["Rural School Teaching Drives", "Digital Saksharta Abhiyan", "Science & Innovation Exhibitions"],
      link: "/activities",
    },
    {
      id: "health",
      icon: "🩸",
      title: "Healthcare, Red Ribbon & Blood Wing",
      hindi: "स्वास्थ्य एवं रक्तदान प्रकोष्ठ",
      color: "#dc2626",
      badge: "Life-Saving",
      desc: "Operating a 24/7 student voluntary blood donor network for hospitals across Nirmal, Nizamabad, and Adilabad, paired with regular free medical camps.",
      highlights: ["Campus Blood Donation Drives", "Red Ribbon Club Awareness", "Anemia & Health Checkups"],
      link: "/blood-donors",
    },
    {
      id: "environment",
      icon: "🌱",
      title: "Environment & Climate Action (Haritha Haram)",
      hindi: "पर्यावरण एवं हरित परिसर",
      color: "#16a34a",
      badge: "Sustainability",
      desc: "Mass afforestation under Telangana Ku Haritha Haram, single-use plastic elimination, seed ball preparation, and maintenance of organic herbal gardens.",
      highlights: ["12,500+ Saplings Planted", "Plastic-Free Campus Campaign", "Godavari Riverbank Cleanups"],
      link: "/activities",
    },
    {
      id: "rural",
      icon: "🏘️",
      title: "Adopted Villages & Rural Immersion",
      hindi: "दत्तक ग्राम एवं ग्रामीण विकास",
      color: "#d97706",
      badge: "Flagship",
      desc: "Conducting annual 7-day residential rural immersion camps in adopted villages (Saleguda, Gangadhar, Bidrelli) focusing on grassroots civic improvements.",
      highlights: ["Socio-Economic Village Surveys", "Gram Panchayat Sanitation Drives", "Veterinary Health Camps"],
      link: "/units",
    },
    {
      id: "inclusion",
      icon: "♿",
      title: "Inclusivity, Scribes & Youth Leadership",
      hindi: "समावेशी समाज एवं स्वयंसेवक प्रकोष्ठ",
      color: "#7c3aed",
      badge: "Social Welfare",
      desc: "Providing verified student scribes to assist visually impaired and differently-abled students during university examinations, plus voter literacy drives.",
      highlights: ["Exam Scribe Volunteer Registry", "National Youth Festival Delegations", "SVEEP Voter Awareness Campaigns"],
      link: "/circulars",
    },
  ];

  return (
    <section className="gov-domains-section" aria-label="Functional Verticals of NSS">
      <div className="gov-section-header">
        <span className="gov-section-tag">OPERATIONAL STRUCTURE (IIT / CENTRAL UNIVERSITY MODEL)</span>
        <h2 className="gov-section-title">Functional Domains & Action Verticals</h2>
        <p className="gov-section-subtitle">
          NSS RGUKT Basar organizes its volunteer corps into structured domain verticals, ensuring specialized execution and measurable societal outcomes.
        </p>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      <div className="gov-domains-grid">
        {domains.map((domain) => (
          <div key={domain.id} className="gov-domain-card" style={{ borderTopColor: domain.color }}>
            <div className="domain-top-bar">
              <span className="domain-icon" aria-hidden="true">{domain.icon}</span>
              <span className="domain-badge" style={{ color: domain.color, borderColor: domain.color }}>
                {domain.badge}
              </span>
            </div>

            <div className="domain-content">
              <div className="domain-hindi">{domain.hindi}</div>
              <h3 className="domain-title">{domain.title}</h3>
              <p className="domain-desc">{domain.desc}</p>

              <div className="domain-highlights">
                <strong>Key Initiatives:</strong>
                <ul>
                  {domain.highlights.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="domain-footer">
              <Link to={domain.link} className="domain-action-btn">
                <span>Explore Vertical</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NSSDomains;
