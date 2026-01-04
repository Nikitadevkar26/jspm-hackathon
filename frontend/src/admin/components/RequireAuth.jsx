import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const RequireAuth = () => {
    const { token } = useAdmin();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
