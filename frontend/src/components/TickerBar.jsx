import { useState } from "react";
import { Link } from "react-router-dom";

function TickerBar() {
  const [isPaused, setIsPaused] = useState(false);

  const announcements = [
    {
      id: 1,
      badge: "CIRCULAR",
      isNew: true,
      text: "Central NSS Volunteer Enrolment for Academic Session 2026-27 is now OPEN — Apply Online before 15th Dec.",
      link: "/join",
    },
    {
      id: 2,
      badge: "CAMP",
      isNew: true,
      text: "7-Day Special Rural Immersion Camp at Adopted Villages scheduled from Jan 10-16, 2026.",
      link: "/activities",
    },
    {
      id: 3,
      badge: "BLOOD DRIVE",
      isNew: false,
      text: "Mega Voluntary Blood Donation Camp organized at Student Activity Center (SAC) — 280+ units collected.",
      link: "/blood-donors",
    },
    {
      id: 4,
      badge: "MY BHARAT",
      isNew: false,
      text: "NSS Volunteers directed to register on the Central MY Bharat Portal (mybharat.gov.in) for National Youth Festival.",
      link: "https://mybharat.gov.in/",
      external: true,
    },
  ];

  return (
    <div className="gov-ticker-bar">
      <div className="gov-ticker-container">
        {/* Left Badge Header */}
        <div className="gov-ticker-badge">
          <span className="ticker-pulse-dot" aria-hidden="true"></span>
          <strong>LATEST NOTICES</strong>
          <span className="ticker-badge-sub">महत्वपूर्ण सूचनाएं</span>
        </div>

        {/* Marquee Body */}
        <div
          className={`gov-ticker-track ${isPaused ? "paused" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="gov-ticker-content">
            {announcements.concat(announcements).map((item, idx) => (
              <span key={`${item.id}-${idx}`} className="gov-ticker-item">
                <span className={`ticker-tag ${item.badge.toLowerCase().replace(" ", "-")}`}>
                  {item.badge}
                </span>
                {item.isNew && <span className="ticker-new-badge">NEW</span>}
                {item.external ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.text}
                  </a>
                ) : (
                  <Link to={item.link}>{item.text}</Link>
                )}
                <span className="ticker-separator">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="gov-ticker-controls">
          <button
            type="button"
            className="ticker-control-btn"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Play scrolling notices" : "Pause scrolling notices"}
            aria-label={isPaused ? "Play notices" : "Pause notices"}
          >
            {isPaused ? "▶" : "⏸"}
          </button>
          <Link to="/circulars" className="ticker-view-all-btn">
            View All →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TickerBar;
