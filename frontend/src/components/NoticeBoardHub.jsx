import { useState } from "react";
import { Link } from "react-router-dom";

function NoticeBoardHub() {
  const [activeTab, setActiveTab] = useState("circulars");

  const circulars = [
    {
      id: "c1",
      date: "25 Nov 2026",
      number: "NSS/RGUKT/2026/CIR-14",
      title: "Central NSS Volunteer Enrolment Schedule for Academic Year 2026-27",
      isNew: true,
      size: "245 KB",
      fileType: "PDF",
    },
    {
      id: "c2",
      date: "18 Nov 2026",
      number: "NSS/RGUKT/2026/CAMP-03",
      title: "Guidelines for 7-Day Special Rural Immersion Camp at Adopted Villages",
      isNew: true,
      size: "410 KB",
      fileType: "PDF",
    },
    {
      id: "c3",
      date: "05 Nov 2026",
      number: "NSS/RGUKT/2026/BLD-08",
      title: "Report of Campus Blood Donation Drive — Acknowledgement of Donors",
      isNew: false,
      size: "520 KB",
      fileType: "PDF",
    },
    {
      id: "c4",
      date: "22 Oct 2026",
      number: "NSS/RGUKT/2026/YF-02",
      title: "Call for Nominations: National Youth Festival & State NSS Awards 2026",
      isNew: false,
      size: "380 KB",
      fileType: "PDF",
    },
  ];

  const upcomingCamps = [
    {
      id: "e1",
      month: "DEC",
      day: "01",
      year: "2026",
      title: "World AIDS Awareness Day Rally & Red Ribbon Club Campaign",
      venue: "Main Administrative Quadrangle to Basar Village",
      status: "Registration Open",
    },
    {
      id: "e2",
      month: "DEC",
      day: "15",
      year: "2026",
      title: "Swachh Bharat Cleanliness Drive & E-Waste Segregation Workshop",
      venue: "Student Activity Center (SAC) & Campus Hostels",
      status: "Upcoming",
    },
    {
      id: "e3",
      month: "JAN",
      day: "10",
      year: "2027",
      title: "Annual 7-Day Special Camp: Rural Sanitation & Digital Literacy",
      venue: "Adopted Villages (Saleguda, Gangadhar, Bidrelli)",
      status: "Mandatory for Unit-I & II",
    },
    {
      id: "e4",
      month: "JAN",
      day: "26",
      year: "2027",
      title: "Republic Day Ceremonial Parade & Blood Donation Camp",
      venue: "RGUKT Basar Sports Ground",
      status: "All Units",
    },
  ];

  const nationalCampaigns = [
    {
      id: "nc1",
      name: "MY Bharat (Mera Yuva Bharat)",
      tag: "FLAGSHIP",
      desc: "An autonomous youth leadership ecosystem to connect youth with community development opportunities.",
      link: "https://mybharat.gov.in/",
      logoText: "🇮🇳 MY BHARAT",
    },
    {
      id: "nc2",
      name: "Swachhata Hi Seva & Clean India",
      tag: "NATIONAL",
      desc: "Continuous plastic-free drives, campus cleanliness, and village water body rejuvenation.",
      link: "/activities",
      logoText: "🧹 SWACHH BHARAT",
    },
    {
      id: "nc3",
      name: "Telangana Ku Haritha Haram",
      tag: "STATE",
      desc: "Mass tree plantation and maintenance of medicinal gardens across the 272-acre RGUKT Basar campus.",
      link: "/activities",
      logoText: "🌱 HARITHA HARAM",
    },
    {
      id: "nc4",
      name: "Red Ribbon Club & Blood Donation",
      tag: "HEALTH",
      desc: "24/7 volunteer emergency blood donor network supporting local hospitals across Nirmal and Nizamabad.",
      link: "/blood-donors",
      logoText: "🩸 RED RIBBON",
    },
  ];

  return (
    <section className="gov-notice-hub-section" aria-label="Official Circulars, Events and Campaigns">
      <div className="gov-section-header">
        <span className="gov-section-tag">INFORMATION DESK</span>
        <h2 className="gov-section-title">Official Notice Board & Activities Hub</h2>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      <div className="gov-notice-hub-grid">
        {/* Column 1: Official Circulars & Orders */}
        <div className="gov-notice-column">
          <div className="notice-column-header">
            <div className="notice-header-title">
              <span className="col-icon">📑</span>
              <h3>Circulars & Orders</h3>
            </div>
            <Link to="/circulars" className="col-view-all">
              All Orders →
            </Link>
          </div>

          <div className="notice-list">
            {circulars.map((item) => (
              <div key={item.id} className="notice-item">
                <div className="notice-meta">
                  <span className="notice-date">{item.date}</span>
                  <span className="notice-num">{item.number}</span>
                  {item.isNew && <span className="notice-new-chip">NEW</span>}
                </div>
                <h4 className="notice-title">
                  <Link to="/circulars">{item.title}</Link>
                </h4>
                <div className="notice-download">
                  <Link to="/circulars" className="notice-download-btn">
                    <span>📥 Download {item.fileType}</span>
                    <small>({item.size})</small>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Upcoming Camps & Events */}
        <div className="gov-notice-column">
          <div className="notice-column-header">
            <div className="notice-header-title">
              <span className="col-icon">📅</span>
              <h3>Upcoming Camps & Calendar</h3>
            </div>
            <Link to="/activities" className="col-view-all">
              Full Calendar →
            </Link>
          </div>

          <div className="events-list">
            {upcomingCamps.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-date-box">
                  <span className="event-month">{event.month}</span>
                  <strong className="event-day">{event.day}</strong>
                  <span className="event-year">{event.year}</span>
                </div>
                <div className="event-info">
                  <h4 className="event-title">
                    <Link to="/activities">{event.title}</Link>
                  </h4>
                  <p className="event-venue">📍 {event.venue}</p>
                  <span className="event-status-tag">{event.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: National & State Campaigns */}
        <div className="gov-notice-column">
          <div className="notice-column-header">
            <div className="notice-header-title">
              <span className="col-icon">🇮🇳</span>
              <h3>National & State Initiatives</h3>
            </div>
            <span className="col-badge">GOI / TS</span>
          </div>

          <div className="campaign-list">
            {nationalCampaigns.map((camp) => (
              <div key={camp.id} className="campaign-card">
                <div className="campaign-top">
                  <span className="campaign-logo-badge">{camp.logoText}</span>
                  <span className="campaign-tag">{camp.tag}</span>
                </div>
                <h4 className="campaign-name">{camp.name}</h4>
                <p className="campaign-desc">{camp.desc}</p>
                {camp.link.startsWith("http") ? (
                  <a
                    href={camp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="campaign-link"
                  >
                    Official Portal ↗
                  </a>
                ) : (
                  <Link to={camp.link} className="campaign-link">
                    View Details →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoticeBoardHub;
