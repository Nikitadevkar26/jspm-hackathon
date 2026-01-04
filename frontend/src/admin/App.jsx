import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";

// Pages
import LoginPage from "./pages/LoginPage";
import Dashboard from "./Dashboard/Dashboard";
import Registrations from "./pages/Registrations";
import TeamPage from "./pages/TeamPage";
import EvaluatorPage from "./pages/EvaluatorPage";
import SectionHeadPage from "./pages/SectionHeadPage";
import SectionHeadRegistration from "./pages/SectionHeadRegistration";
import GrievancePage from "./pages/GrievancePage";
import NoticesPage from "./pages/NoticesPage";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-team-registrations" element={<Registrations />} />
        <Route path="/approved-teams" element={<TeamPage />} />
        <Route path="/view-all-evaluator" element={<EvaluatorPage />} />
        <Route path="/section-head" element={<SectionHeadPage />} />
        <Route path="/section-head-register" element={<SectionHeadRegistration />} />
        <Route path="/grievance" element={<GrievancePage />} />
        <Route path="/notices" element={<NoticesPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
