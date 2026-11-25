import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import Alumni from "./pages/Alumni";
import Units from "./pages/Units";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import JoinNSS from "./pages/JoinNSS";
import Login from "./pages/Login";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Policies from "./pages/Policies";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/units" element={<Units />} />
          <Route path="/join" element={<JoinNSS />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Institutional Policies & Sitemap */}
          <Route path="/privacy" element={<Policies />} />
          <Route path="/disclaimer" element={<Policies />} />
          <Route path="/website-policies" element={<Policies />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
