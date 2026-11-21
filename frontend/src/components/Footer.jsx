import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-column">

          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/activities">Activities / Events</Link>
          <Link to="/gallery">Photo Gallery</Link>
          <Link to="/units">NSS Units</Link>
          <Link to="/join">Join as Volunteer</Link>
          <Link to="/contact">Contact Us</Link>

        </div>


        <div className="footer-column">

          <h3>Portals & Links</h3>

          <Link to="/login?role=volunteer">Volunteer Portal</Link>
          <Link to="/admin">Admin Portal</Link>

          <a
            href="https://nss.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NSS India
          </a>

          <a
            href="https://mybharat.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MY Bharat
          </a>

          <a
            href="https://www.rgukt.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            RGUKT Basar
          </a>

        </div>

      </div>


      <div className="footer-bottom">

        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/disclaimer">
            Disclaimer
          </Link>

          <Link to="/website-policies">
            Website Policies
          </Link>

          <Link to="/sitemap">
            Sitemap
          </Link>

        </div>

        <p>
          © 2026 NSS RGUKT Basar. All Rights Reserved.
        </p>

        <p>
          Website maintained by NSS Unit, RGUKT Basar.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
