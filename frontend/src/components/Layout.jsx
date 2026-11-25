import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

function Layout({ children }) {
  return (
    <div className="website">
      {/* Accessible skip link for keyboard navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Header />

      <div className="main-layout">
        <Sidebar />

        <main className="content" id="main-content" tabIndex="-1">
          {children}
        </main>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default Layout;
