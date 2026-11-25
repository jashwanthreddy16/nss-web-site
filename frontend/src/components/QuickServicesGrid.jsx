import { Link } from "react-router-dom";

function QuickServicesGrid() {
  const services = [
    {
      id: "enrol",
      icon: "✍️",
      title: "Online Volunteer Enrolment",
      hindi: "स्वयंसेवक ऑनलाइन पंजीकरण",
      desc: "Apply for 2-Year NSS certification program (240 hours community service).",
      link: "/join",
      cta: "Register Now",
      isPrimary: true,
    },
    {
      id: "blood",
      icon: "🩸",
      title: "Emergency Blood Donors",
      hindi: "आपातकालीन रक्तदान निर्देशिका",
      desc: "Search verified campus volunteer donors by blood group for urgent requirements.",
      link: "/blood-donors",
      cta: "Find Donors",
      isPrimary: false,
    },
    {
      id: "circulars",
      icon: "📑",
      title: "Circulars & Office Orders",
      hindi: "परिपत्र एवं कार्यालय आदेश",
      desc: "Access official notifications, meeting minutes, and government directives.",
      link: "/circulars",
      cta: "View Circulars",
      isPrimary: false,
    },
    {
      id: "diary",
      icon: "🪪",
      title: "Volunteer Diary & Forms",
      hindi: "स्वयंसेवक डायरी एवं प्रपत्र",
      desc: "Download official NSS Work Diary, Camp Undertaking, and NOC templates.",
      link: "/circulars#downloads",
      cta: "Download Forms",
      isPrimary: false,
    },
    {
      id: "units",
      icon: "📋",
      title: "Units & Program Officers",
      hindi: "इकाइयां एवं कार्यक्रम अधिकारी",
      desc: "Explore Unit-I to Unit-IV allocation, campus zones, and faculty officers.",
      link: "/units",
      cta: "Explore Units",
      isPrimary: false,
    },
    {
      id: "mybharat",
      icon: "🇮🇳",
      title: "MY Bharat Central Portal",
      hindi: "मेरा युवा भारत राष्ट्रीय पोर्टल",
      desc: "Direct integration with Ministry of Youth Affairs national youth platform.",
      link: "https://mybharat.gov.in/",
      cta: "Visit Portal ↗",
      external: true,
      isPrimary: false,
    },
  ];

  return (
    <section className="gov-services-section" aria-label="Citizen and Volunteer Services">
      <div className="gov-section-header">
        <span className="gov-section-tag">CITIZEN & VOLUNTEER CORNER</span>
        <h2 className="gov-section-title">Digital Services & Quick Access Hub</h2>
        <p className="gov-section-subtitle">
          Transparent, accessible, and citizen-first digital services for volunteers, students, and citizens.
        </p>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      <div className="gov-services-grid">
        {services.map((item) => (
          <div key={item.id} className={`gov-service-card ${item.isPrimary ? "service-featured" : ""}`}>
            <div className="service-icon-wrapper" aria-hidden="true">
              <span className="service-icon">{item.icon}</span>
            </div>
            <div className="service-content">
              <div className="service-hindi-title">{item.hindi}</div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-desc">{item.desc}</p>
            </div>
            <div className="service-action">
              {item.external ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-btn"
                >
                  {item.cta}
                </a>
              ) : (
                <Link to={item.link} className="service-btn">
                  {item.cta}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickServicesGrid;
