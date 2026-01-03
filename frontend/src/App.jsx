import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

/* =========================
   PUBLIC PAGES
========================= */
import HackathonDashboard from "./pages/HackathonDashboard";
import Login from "./components/Login";
import TeamRegistration from "./pages/TeamRegistration";
import EvaluatorRegistration from "./pages/EvaluatorRegistration";
import EvaluatorApp from "./pages/EvaluatorApp";
import Faqs from "./pages/Faqs";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Guidelines from "./pages/Guidelines";

/* =========================
   EVALUATOR DASHBOARD
========================= */
import EvaluatorDashboardLayout from "./evaluator/layout/evaluatorDashboardLayout";

/* =========================
   COMMON LAYOUT
========================= */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* =========================
   TEAM LEADER DASHBOARD
========================= */
import TeamLeaderDashboard from "./pages/dashboard/TeamLeaderDashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import IdeaSubmission from "./pages/dashboard/IdeaSubmission";
import TeamProfile from "./pages/dashboard/TeamProfile";

/* =========================
   GLOBAL LAYOUT
========================= */
const Layout = () => {
  const location = useLocation();

  // Hide Navbar & Footer on dashboard routes
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/evaluator");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<HackathonDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teamRegistration" element={<TeamRegistration />} />
          <Route
            path="/evaluatorRegistration"
            element={<EvaluatorRegistration />}
          />
          <Route path="/evaluatorapp" element={<EvaluatorApp />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/guidelines" element={<Guidelines />} />

          {/* ================= TEAM LEADER DASHBOARD ================= */}
          <Route path="/dashboard" element={<TeamLeaderDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="idea-submission" element={<IdeaSubmission />} />
            <Route path="profile" element={<TeamProfile />} />
          </Route>

          {/* ================= EVALUATOR DASHBOARD ================= */}
          <Route
            path="/evaluator/evaluator-dashboard"
            element={<EvaluatorDashboardLayout />}
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

/* =========================
   APP ROOT
========================= */
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
