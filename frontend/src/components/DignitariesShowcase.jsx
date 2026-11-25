import { Link } from "react-router-dom";

function DignitariesShowcase() {
  const dignitaries = [
    {
      id: "vc",
      role: "Chief Patron",
      name: "Prof. S. Goverdhan Rao",
      designation: "Vice Chancellor (I/c), RGUKT Basar",
      quote: "National Service Scheme instills empathy, discipline, and societal commitment in our young engineers, molding them into nation builders.",
      badge: "University Leadership",
      avatar: "🏛️",
    },
    {
      id: "coordinator",
      role: "Program Coordinator",
      name: "Dr. K. Srinivas Reddy",
      designation: "NSS Cell Coordinator, RGUKT Basar",
      quote: "Our motto 'Not Me But You' reflects the essence of democratic living and upholds the need for selfless service to society.",
      badge: "NSS State Directorate",
      avatar: "🎖️",
    },
    {
      id: "dsw",
      role: "Dean of Student Welfare",
      name: "Sri B. Vijay Kumar",
      designation: "Dean Student Welfare & NSS Liaison",
      quote: "Through rural immersion camps and social welfare activities, our students bridge the rural-urban divide with compassionate technological innovations.",
      badge: "Student Affairs",
      avatar: "📜",
    },
  ];

  return (
    <section className="gov-dignitaries-section" aria-label="Key Institutional Dignitaries">
      <div className="gov-section-header">
        <span className="gov-section-tag">LEADERSHIP & MENTORSHIP</span>
        <h2 className="gov-section-title">Messages from Our Patrons & Leadership</h2>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      <div className="gov-dignitaries-grid">
        {dignitaries.map((person) => (
          <div key={person.id} className="gov-dignitary-card">
            <div className="dignitary-card-badge">{person.role}</div>
            <div className="dignitary-header">
              <div className="dignitary-avatar" aria-hidden="true">
                {person.avatar}
              </div>
              <div className="dignitary-meta">
                <h3 className="dignitary-name">{person.name}</h3>
                <p className="dignitary-designation">{person.designation}</p>
                <span className="dignitary-division">{person.badge}</span>
              </div>
            </div>

            <div className="dignitary-quote-box">
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="dignitary-quote">{person.quote}</p>
            </div>

            <div className="dignitary-card-footer">
              <Link to="/about" className="dignitary-link">
                View Advisory Board →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DignitariesShowcase;
