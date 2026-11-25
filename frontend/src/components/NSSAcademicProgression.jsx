import { Link } from "react-router-dom";

function NSSAcademicProgression() {
  const steps = [
    {
      step: "01",
      title: "Induction & Orientation",
      duration: "Semester 1",
      hours: "20 Hours",
      desc: "Campus volunteer orientation, NSS pledge, community ethics, and preliminary campus sanitation/plantation drives.",
      badge: "Foundation",
    },
    {
      step: "02",
      title: "Regular Field Service (Year 1)",
      duration: "Semester 1 & 2",
      hours: "100 Hours",
      desc: "Weekly village visits, rural school tutoring, health camp volunteer coordination, and green campus maintenance.",
      badge: "Year 1 Milestone",
    },
    {
      step: "03",
      title: "7-Day Special Rural Camp",
      duration: "Vacation / Sem Break",
      hours: "Mandatory 7 Days",
      desc: "Residential community immersion in adopted villages conducting socio-economic surveys, veterinary aid, and water conservation.",
      badge: "Flagship Camp",
    },
    {
      step: "04",
      title: "Advanced Projects (Year 2)",
      duration: "Semester 3 & 4",
      hours: "120 Hours",
      desc: "Leading blood donation drives, national youth festival delegations, disaster mitigation drills, and junior volunteer mentorship.",
      badge: "Year 2 Milestone",
    },
    {
      step: "05",
      title: "Final Audit & Certification",
      duration: "Graduation",
      hours: "240 Hours Total",
      desc: "Work diary verification by Program Officers, awarding of official Central NSS Certificate signed by VC and Regional Director.",
      badge: "Govt. Certificate",
    },
  ];

  return (
    <section className="gov-progression-section" aria-label="NSS 240 Hours Certification Progression">
      <div className="gov-section-header">
        <span className="gov-section-tag">CURRICULUM & CERTIFICATION PATHWAY</span>
        <h2 className="gov-section-title">NSS 240-Hour Certification Roadmap</h2>
        <p className="gov-section-subtitle">
          Standardized under Ministry of Youth Affairs guidelines: a structured 2-year volunteer journey transforming students into empathetic leaders.
        </p>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      <div className="gov-progression-timeline">
        {steps.map((item, idx) => (
          <div key={idx} className="progression-step-card">
            <div className="step-num-pill">{item.step}</div>
            <div className="step-badge">{item.badge}</div>
            <h3 className="step-title">{item.title}</h3>
            <div className="step-meta">
              <span className="meta-duration">🗓️ {item.duration}</span>
              <span className="meta-hours">⏱️ {item.hours}</span>
            </div>
            <p className="step-desc">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="progression-cta-bar">
        <div className="progression-note">
          <span>📜</span>
          <p>
            <strong>Official Endorsement:</strong> NSS Merit Certificates are recognized for postgraduate admissions, civil services preparation (UPSC/TSPSC), and national youth awards.
          </p>
        </div>
        <Link to="/join" className="progression-enrol-btn">
          Start Your NSS Journey (Enrol Now) →
        </Link>
      </div>
    </section>
  );
}

export default NSSAcademicProgression;
