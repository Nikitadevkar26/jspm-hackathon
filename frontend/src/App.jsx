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
import Login from "./components/Login.jsx";
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
import EvaluatorDashboardLayout from "../src/evaluator/layout/EvaluatorDashboardLayout";

/* =========================
   ADMIN DASHBOARD
========================= */
import Dashboard from "./admin_pages/AdminLiveDashboard.jsx";
import EvaluatorPage from "./admin_pages/EvaluatorPage";
import GrievancePage from "./admin_pages/GrievancePage";
import NoticesPage from "./admin_pages/NoticesPage";
import ViewTeamRegistrations from "./admin_pages/ViewTeamRegistrations";
import EvaluatorTeamAssignPage from "./admin_pages/EvaluatorTeamAssignPage.jsx";
import SectionHeadRegistration from "./admin_pages/SectionHeadRegistration";
import TeamPage from "./admin_pages/TeamPage";
import { AdminProvider } from "./context/AdminContext";
import AdminLayout from "./admin_pages/adminLayouts/AdminLayout";
import ViewTeamIS from "./admin_pages/ViewTeamIS";

/* =========================
   COMMON LAYOUT
========================= */
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

/* =========================
   TEAM LEADER DASHBOARD
========================= */
import DashboardHome from "./pages/dashboard/DashboardHome";
import IdeaSubmission from "./pages/dashboard/IdeaSubmission";
import TeamLeaderDashboard from "./pages/dashboard/TeamLeaderDashboard";
import TeamProfile from "./pages/dashboard/TeamProfile";
import SetPassword from "./components/teamLeaderdashboard/SetPassword";

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
          <Route path="/evaluatorRegistration" element={<EvaluatorRegistration />} />
          <Route path="/evaluatorapp" element={<EvaluatorApp />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/guidelines" element={<Guidelines />} />

          {/* ================= TEAM LEADER DASHBOARD ================= */}
          <Route path="/dashboard" element={<TeamLeaderDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="idea-submission" element={<IdeaSubmission />} />
            <Route path="reset-password" element={<SetPassword />} />
            <Route path="profile" element={<TeamProfile />} />
          </Route>

          {/* ================= EVALUATOR DASHBOARD ================= */}
          <Route
            path="/evaluator/evaluator-dashboard"
            element={<EvaluatorDashboardLayout />}
          />

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route path="/admin" element={
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="view-team-registrations" element={<ViewTeamRegistrations />} />
            <Route path="team-idea-submission" element={<ViewTeamIS />} />
            <Route path="approved-teams" element={<TeamPage />} />
            <Route path="view-all-evaluator" element={<EvaluatorPage />} />
            <Route path="section-head" element={<EvaluatorTeamAssignPage />} />
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
    <Router>
      <Layout />
    </Router>
  );
}
