import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";

/* =========================
   PUBLIC PAGES
========================= */
import Login from "./components/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import EvaluatorApp from "./pages/EvaluatorApp";
import EvaluatorRegistration from "./pages/EvaluatorRegistration";
import Faqs from "./pages/Faqs";
import Guidelines from "./pages/Guidelines";
import HackathonDashboard from "./pages/HackathonDashboard";
import TeamRegistration from "./pages/TeamRegistration";

/* =========================
   EVALUATOR DASHBOARD
========================= */
import EvaluatorDashboardLayout from "./evaluator/layout/evaluatorDashboardLayout";

/* =========================
   COMMON LAYOUT
========================= */
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

/* =========================
   ADMIN DASHBOARD
========================= */
import RequireAuth from "./admin/components/RequireAuth";
import { AdminProvider } from "./admin/context/AdminContext";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import EvaluatorPage from "./admin/pages/EvaluatorPage";
import GrievancePage from "./admin/pages/GrievancePage";
import NoticesPage from "./admin/pages/NoticesPage";
import Registrations from "./admin/pages/Registrations";
import SectionHeadPage from "./admin/pages/SectionHeadPage";
import SectionHeadRegistration from "./admin/pages/SectionHeadRegistration";
import TeamPage from "./admin/pages/TeamPage";

/* =========================
   TEAM LEADER DASHBOARD
========================= */
import DashboardHome from "./pages/dashboard/DashboardHome";
import IdeaSubmission from "./pages/dashboard/IdeaSubmission";
import TeamLeaderDashboard from "./pages/dashboard/TeamLeaderDashboard";
import TeamProfile from "./pages/dashboard/TeamProfile";

/* =========================
   GLOBAL LAYOUT
========================= */
const Layout = () => {
  const location = useLocation();

  // Hide Navbar & Footer on dashboard routes
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/evaluator") ||
    location.pathname.startsWith("/admin");

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

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route path="/admin" element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="view-team-registrations" element={<Registrations />} />
            <Route path="approved-teams" element={<TeamPage />} />
            <Route path="view-all-evaluator" element={<EvaluatorPage />} />
            <Route path="section-head" element={<SectionHeadPage />} />
            <Route path="section-head-register" element={<SectionHeadRegistration />} />
            <Route path="grievance" element={<GrievancePage />} />
            <Route path="notices" element={<NoticesPage />} />
          </Route>

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
    <AdminProvider>
      <Router>
        <Layout />
      </Router>
    </AdminProvider>
  );
}
