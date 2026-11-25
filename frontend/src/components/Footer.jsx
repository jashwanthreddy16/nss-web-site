import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="gov-footer" role="contentinfo" aria-label="Official Institutional Footer">
      {/* 1. National Initiatives Logos Carousel / Banner */}
      <div className="gov-footer-initiatives">
        <div className="gov-footer-initiatives-inner">
          <span className="initiatives-label">AFFILIATIONS & PARTNERS:</span>
          <div className="initiatives-logo-strip">
            <a
              href="https://yas.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="Ministry of Youth Affairs & Sports"
              className="initiative-partner-link"
            >
              <img src="/1024px-Ministry_of_Youth_Affairs_and_Sports.png" alt="Ministry of Youth Affairs and Sports" />
              <span>Ministry of Youth Affairs & Sports</span>
            </a>

            <a
              href="https://mybharat.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="MY Bharat National Portal"
              className="initiative-partner-link"
            >
              <img src="/my-bharat-logo-png_seeklogo-677239.png" alt="MY Bharat Portal" />
              <span>Mera Yuva Bharat</span>
            </a>

            <a
              href="https://eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="Election Commission of India"
              className="initiative-partner-link"
            >
              <img src="/Election-commission-L.png" alt="Election Commission of India" />
              <span>Election Commission of India</span>
            </a>

            <a
              href="https://sdgs.un.org/goals"
              target="_blank"
              rel="noopener noreferrer"
              title="Sustainable Development Goals"
              className="initiative-partner-link"
            >
              <img src="/sdg-logo-removebg-preview.png" alt="Sustainable Development Goals" />
              <span>UN Sustainable Development Goals</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Four-Column Government Institutional Grid */}
      <div className="gov-footer-main">
        <div className="gov-footer-container">
          {/* Column 1: Institutional Profile */}
          <div className="gov-footer-col">
            <div className="gov-footer-brand">
              <img src="/nsslogo.png" alt="NSS Emblem" className="gov-footer-nss-logo" />
              <div>
                <h3 className="gov-footer-heading">National Service Scheme</h3>
                <p className="gov-footer-sub">RGUKT Basar Unit • Telangana</p>
              </div>
            </div>
            <p className="gov-footer-desc">
              National Service Scheme (NSS) is a flagship Central Sector Scheme under the Ministry of Youth Affairs and Sports, Government of India, operating at RGUKT Basar to inculcate the spirit of voluntary community service among student youth.
            </p>
            <div className="gov-motto-box">
              <strong>Motto:</strong> &ldquo;Not Me But You&rdquo; (नाहं कर्ता हरिः कर्ता)
            </div>
          </div>

          {/* Column 2: Government & University Portals */}
          <div className="gov-footer-col">
            <h3 className="gov-footer-col-title">Government & Official Portals</h3>
            <ul className="gov-footer-links">
              <li>
                <a href="https://nss.gov.in/" target="_blank" rel="noopener noreferrer">
                  Central NSS India Portal (nss.gov.in) ↗
                </a>
              </li>
              <li>
                <a href="https://mybharat.gov.in/" target="_blank" rel="noopener noreferrer">
                  MY Bharat National Youth Portal ↗
                </a>
              </li>
              <li>
                <a href="https://yas.gov.in/" target="_blank" rel="noopener noreferrer">
                  Ministry of Youth Affairs & Sports ↗
                </a>
              </li>
              <li>
                <a href="https://www.rgukt.ac.in/" target="_blank" rel="noopener noreferrer">
                  RGUKT Basar Official Portal ↗
                </a>
              </li>
              <li>
                <a href="https://telangana.gov.in/" target="_blank" rel="noopener noreferrer">
                  Government of Telangana Official Portal ↗
                </a>
              </li>
              <li>
                <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
                  Digital India Initiative ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen Services & Governance */}
          <div className="gov-footer-col">
            <h3 className="gov-footer-col-title">Citizen Corner & Governance</h3>
            <ul className="gov-footer-links">
              <li>
                <Link to="/join">Online Volunteer Enrolment 2026</Link>
              </li>
              <li>
                <Link to="/circulars">Circulars, Orders & Forms</Link>
              </li>
              <li>
                <Link to="/blood-donors">Emergency Blood Donors Directory</Link>
              </li>
              <li>
                <Link to="/units">NSS Units & Program Officers</Link>
              </li>
              <li>
                <Link to="/login">Volunteer / Staff Portal Login</Link>
              </li>
              <li>
                <Link to="/sitemap">Structured Website Sitemap</Link>
              </li>
              <li>
                <Link to="/website-policies">Citizen Charter & Grievance</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Nodal Contact & Location */}
          <div className="gov-footer-col">
            <h3 className="gov-footer-col-title">Contact & Helpdesk</h3>
            <div className="gov-footer-contact">
              <p>
                <strong>NSS Cell, RGUKT Basar</strong><br />
                Student Activity Center (SAC Building),<br />
                Rajiv Gandhi University of Knowledge Technologies,<br />
                Basar, Nirmal District, Telangana - 504107
              </p>
              <p className="contact-item">
                <span className="contact-icon">📞</span>
                <span>Helpline: 08752-255588</span>
              </p>
              <p className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>Email: <a href="mailto:nss@rgukt.ac.in">nss@rgukt.ac.in</a></span>
              </p>
              <p className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>Hours: Mon - Sat, 09:00 AM - 05:00 PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GIGW 3.0 Standard Bottom Strip */}
      <div className="gov-footer-bottom">
        <div className="gov-footer-bottom-container">
          <div className="gov-bottom-policies">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="policy-divider">|</span>
            <Link to="/disclaimer">Disclaimer</Link>
            <span className="policy-divider">|</span>
            <Link to="/website-policies">Website Policies</Link>
            <span className="policy-divider">|</span>
            <Link to="/website-policies#hyperlink">Hyperlinking Policy</Link>
            <span className="policy-divider">|</span>
            <Link to="/website-policies#copyright">Copyright Policy</Link>
            <span className="policy-divider">|</span>
            <Link to="/website-policies#accessibility">Accessibility Statement</Link>
            <span className="policy-divider">|</span>
            <Link to="/sitemap">Sitemap</Link>
          </div>

          <div className="gov-bottom-disclaimer">
            <p>
              This is the official portal of National Service Scheme (NSS), RGUKT Basar Unit. Content Owned and Managed by NSS Cell, Rajiv Gandhi University of Knowledge Technologies, Basar, Telangana.
            </p>
            <p>
              Designed, Developed and Hosted in compliance with Guidelines for Indian Government Websites (GIGW 3.0).
            </p>
          </div>

          <div className="gov-bottom-meta">
            <div className="gov-compliance-badges">
              <span className="compliance-badge" title="Complies with GIGW 3.0">GIGW 3.0 Compliant</span>
              <span className="compliance-badge" title="W3C Web Content Accessibility Guidelines AA">W3C WAI-AA</span>
              <span className="compliance-badge" title="National Informatics Centre aligned">NIC Aligned</span>
            </div>
            <div className="gov-stats-strip">
              <span>Last Updated: <strong>25-Nov-2026</strong></span>
              <span className="meta-sep">•</span>
              <span>Total Visitors: <strong>1,48,930</strong></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
