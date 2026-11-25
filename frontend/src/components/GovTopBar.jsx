import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function GovTopBar() {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("nss_font_size") || "md";
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("nss_high_contrast") === "true";
  });

  const [language, setLanguage] = useState("EN");

  // Apply font size class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-sm", "font-md", "font-lg");
    root.classList.add(`font-${fontSize}`);
    localStorage.setItem("nss_font_size", fontSize);
  }, [fontSize]);

  // Apply high contrast to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.setAttribute("data-theme", "high-contrast");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("nss_high_contrast", highContrast);
  }, [highContrast]);

  return (
    <div className="gov-topbar">
      <div className="gov-topbar-container">
        {/* Left: National & State Identity */}
        <div className="gov-topbar-left">
          <div className="gov-flag-badge">
            <span className="gov-flag-icon" role="img" aria-label="Indian Tricolor">🇮🇳</span>
            <span className="gov-identity-text">
              <strong>भारत सरकार</strong> | Government of India
            </span>
          </div>
          <span className="gov-separator">|</span>
          <span className="gov-state-text">
            <strong>తెలంగాణ ప్రభుత్వం</strong> | Govt. of Telangana
          </span>
          <span className="gov-separator gov-desktop-only">|</span>
          <span className="gov-ministry-text gov-desktop-only">
            Ministry of Youth Affairs & Sports
          </span>
        </div>

        {/* Right: Accessibility & Language Controls */}
        <div className="gov-topbar-right">
          {/* Skip Link */}
          <a href="#main-content" className="gov-util-link">
            Skip to Main Content
          </a>

          {/* Screen Reader Access */}
          <Link to="/website-policies" className="gov-util-link gov-desktop-only" title="Screen Reader Access information">
            Screen Reader
          </Link>

          {/* Font Size Adjusters */}
          <div className="gov-font-resizer" role="group" aria-label="Font size controls">
            <button
              type="button"
              className={`gov-font-btn ${fontSize === "sm" ? "active" : ""}`}
              onClick={() => setFontSize("sm")}
              title="Decrease text size (A-)"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              type="button"
              className={`gov-font-btn ${fontSize === "md" ? "active" : ""}`}
              onClick={() => setFontSize("md")}
              title="Normal text size (A)"
              aria-label="Normal text size"
            >
              A
            </button>
            <button
              type="button"
              className={`gov-font-btn ${fontSize === "lg" ? "active" : ""}`}
              onClick={() => setFontSize("lg")}
              title="Increase text size (A+)"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            type="button"
            className={`gov-contrast-btn ${highContrast ? "active" : ""}`}
            onClick={() => setHighContrast(!highContrast)}
            title={highContrast ? "Switch to Standard View" : "Switch to High Contrast View"}
            aria-label="Toggle High Contrast Mode"
          >
            {highContrast ? "☀️ Standard" : "🌓 Contrast"}
          </button>

          {/* Language Switch */}
          <div className="gov-lang-select" title="Site Language">
            <button
              type="button"
              className={`gov-lang-btn ${language === "EN" ? "active" : ""}`}
              onClick={() => setLanguage("EN")}
            >
              English
            </button>
            <button
              type="button"
              className={`gov-lang-btn ${language === "TE" ? "active" : ""}`}
              onClick={() => setLanguage("TE")}
            >
              తెలుగు
            </button>
            <button
              type="button"
              className={`gov-lang-btn ${language === "HI" ? "active" : ""}`}
              onClick={() => setLanguage("HI")}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GovTopBar;
