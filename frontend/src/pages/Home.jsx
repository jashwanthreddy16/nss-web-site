import { Link } from "react-router-dom";
import ImpactCounters from "../components/ImpactCounters";
import QuickServicesGrid from "../components/QuickServicesGrid";
import DignitariesShowcase from "../components/DignitariesShowcase";
import NoticeBoardHub from "../components/NoticeBoardHub";
import ActivityCard from "../components/ActivityCard";
import NSSDomains from "../components/NSSDomains";
import NSSAcademicProgression from "../components/NSSAcademicProgression";

function Home() {
  return (
    <div className="gov-home-wrapper">
      {/* =====================================================
          1. OFFICIAL GOVERNMENT HERO BANNER (Clean & Neatly Labeled)
      ===================================================== */}
      <section className="gov-hero-section" aria-label="National Service Scheme Introduction">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Nss_Intro.mp4" type="video/mp4" />
        </video>

        <div className="gov-hero-overlay"></div>

        <div className="gov-hero-container">
          <div className="gov-hero-badge">
            <span className="hero-flag-icon">🇮🇳</span>
            <span>MINISTRY OF YOUTH AFFAIRS & SPORTS • GOVERNMENT OF INDIA</span>
          </div>

          <h1 className="gov-hero-title">
            National Service Scheme (NSS)
          </h1>
          <p className="gov-hero-unit-name">
            RGUKT Basar Unit • Rajiv Gandhi University of Knowledge Technologies, Telangana
          </p>

          <div className="gov-hero-motto-pill">
            <span className="motto-en">&ldquo;NOT ME BUT YOU&rdquo;</span>
            <span className="motto-divider">|</span>
            <span className="motto-hi">&ldquo;नाहं कर्ता हरिः कर्ता&rdquo;</span>
          </div>

          <p className="gov-hero-description">
            Inculcating the spirit of voluntary community service, civic responsibility, and nation-building through grassroots village immersion, environmental sustainability, and life-saving health drives.
          </p>

          <div className="gov-hero-actions">
            <Link to="/join" className="gov-hero-btn primary-btn">
              <span>✍️ Enrol as Volunteer 2026</span>
            </Link>
            <Link to="/circulars" className="gov-hero-btn secondary-btn">
              <span>📑 Circulars & Downloads</span>
            </Link>
            <Link to="/blood-donors" className="gov-hero-btn emergency-btn">
              <span>🩸 Emergency Blood Donors</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. INSTITUTIONAL IMPACT DASHBOARD
      ===================================================== */}
      <ImpactCounters />

      {/* =====================================================
          3. CITIZEN & VOLUNTEER SERVICES HUB (MyGov Style)
      ===================================================== */}
      <QuickServicesGrid />

      {/* =====================================================
          4. FUNCTIONAL DOMAINS & ACTION VERTICALS (IIT Model)
      ===================================================== */}
      <NSSDomains />

      {/* =====================================================
          5. OFFICIAL NOTICE BOARD & ACTIVITIES CALENDAR
      ===================================================== */}
      <NoticeBoardHub />

      {/* =====================================================
          6. NSS 240-HOUR CERTIFICATION ROADMAP
      ===================================================== */}
      <NSSAcademicProgression />

      {/* =====================================================
          7. LEADERSHIP & PATRONS SHOWCASE
      ===================================================== */}
      <DignitariesShowcase />

      {/* =====================================================
          8. RECENT ACTIVITIES & FIELD CAMPS
      ===================================================== */}
      <section className="gov-activities-section" aria-label="Recent NSS Activities">
        <div className="gov-section-header">
          <span className="gov-section-tag">COMMUNITY ENGAGEMENT</span>
          <h2 className="gov-section-title">Recent Field Activities & Programs</h2>
          <p className="gov-section-subtitle">
            Documenting our volunteers in action across adopted villages, community welfare, and environmental conservation.
          </p>
          <div className="gov-title-underline">
            <span className="underline-tricolor-saffron"></span>
            <span className="underline-tricolor-white"></span>
            <span className="underline-tricolor-green"></span>
          </div>
        </div>

        <div className="gov-activity-grid">
          <ActivityCard
            images={[
              "/IMG-20250819-WA0021.jpg",
              "/IMG-20250504-WA0020.jpg",
              "/IMG-20240211-WA0014.jpg",
            ]}
            title="Sustainable Development Goals (SDGs) & Eco-Restoration"
            description="NSS volunteers driving environmental sustainability, plantation drives, and rainwater harvesting initiatives across the Godavari river basin."
          />

          <ActivityCard
            images={[
              "/IMG-20250819-WA0002.jpg",
              "/IMG-20250819-WA0009.jpg",
              "/IMG-20250712-WA0035.jpg",
            ]}
            title="Rural Youth Skill Development & Digital Literacy"
            description="Special camps conducting computer literacy workshops, competitive exam guidance, and career awareness for rural school students."
          />

          <ActivityCard
            images={[
              "/IMG-20250310-WA0018.jpg",
              "/IMG-20250310-WA0010.jpg",
              "/IMG-20250311-WA0029.jpg",
            ]}
            title="7-Day Special Village Immersion Camp & Health Drive"
            description="Unit-wise residential camps organizing comprehensive village socio-economic surveys, veterinary camps, and free medical health checkups."
          />
        </div>

        <div className="gov-activities-action-bar">
          <Link to="/activities" className="gov-all-activities-btn">
            View All Activities & Annual Reports →
          </Link>
        </div>
      </section>

      {/* =====================================================
          9. INVITATION TO VOLUNTEER (GOVERNMENT CITIZEN CTA)
      ===================================================== */}
      <section className="gov-join-cta-section" aria-label="Join National Service Scheme">
        <div className="gov-join-cta-container">
          <div className="gov-join-cta-content">
            <span className="gov-join-pill">🇮🇳 BE THE CHANGE • YOUTH FOR NATION</span>
            <h2>Ready to Serve Society & Build the Nation?</h2>
            <p>
              Join the National Service Scheme at RGUKT Basar. Dedicate 120 hours of service each year, lead social impact campaigns, and earn the prestigious Central NSS Certificate.
            </p>
            <div className="gov-join-cta-buttons">
              <Link to="/join" className="join-cta-primary">
                Enrol as Volunteer 2026 Online →
              </Link>
              <Link to="/about" className="join-cta-secondary">
                Learn About NSS Objectives
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
