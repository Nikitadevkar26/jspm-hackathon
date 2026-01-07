import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Admin Navbar */}
            <AdminNavbar />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col pt-24">
                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
