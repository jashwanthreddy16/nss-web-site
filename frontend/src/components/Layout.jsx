import GovTopBar from "./GovTopBar";
import Header from "./Header";
import GovNavbar from "./GovNavbar";
import TickerBar from "./TickerBar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import YuvaMitraAssistant from "./YuvaMitraAssistant";

function Layout({ children }) {
  return (
    <div className="gov-website-wrapper">
      {/* Accessible skip link for keyboard navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* 1. National & State Government Identity Strip + Accessibility Resizers */}
      <GovTopBar />

      {/* 2. Official Institutional Bilingual Header Banner */}
      <Header />

      {/* 3. Official Government Mega Navigation Bar */}
      <GovNavbar />

      {/* 4. Live Circulars & Flash News Ticker */}
      <TickerBar />

      {/* 5. Main Content Area */}
      <main className="gov-main-content" id="main-content" tabIndex="-1">
        {children}
      </main>

      {/* 6. GIGW 3.0 Standard Government Footer */}
      <Footer />

      {/* 7. Mobile Thumb Navigation */}
      <MobileBottomNav />

      {/* 8. Yuva Mitra Virtual Assistant (nss.gov.in standard) */}
      <YuvaMitraAssistant />
    </div>
  );
}

export default Layout;
