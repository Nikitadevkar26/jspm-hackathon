import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AdminContext = createContext();

// Hook for easy access
export const useAdmin = () => useContext(AdminContext);

// Provider
export const AdminProvider = ({ children }) => {

    // ✅ Persisted admin state
    const [admin, setAdmin] = useState(() => {
        const savedAdmin = localStorage.getItem("admin");
        return savedAdmin ? JSON.parse(savedAdmin) : null;
    });

    // 🔁 Sync admin with localStorage
    useEffect(() => {
        if (admin) {
            localStorage.setItem("admin", JSON.stringify(admin));
        } else {
            localStorage.removeItem("admin");
        }
    }, [admin]);

    // Registrations data
    const [registrations, setRegistrations] = useState([
        { team: "Team Alpha", leader: "John Doe", email: "john@example.com", score: 85, status: "Selected", projectTitle: "AI Healthcare App", problemStatement: "AI to improve diagnostics" },
        { team: "Team Beta", leader: "Jane Smith", email: "jane@example.com", score: 65, status: "Non-Selected", projectTitle: "Smart City IoT", problemStatement: "IoT sensors for traffic optimization" },
        { team: "Team Gamma", leader: "Alice Johnson", email: "alice@example.com", score: 90, status: "Selected", projectTitle: "E-Learning Platform", problemStatement: "AI tutor for personalized learning" },
        { team: "Team Delta", leader: "Bob Brown", email: "bob@example.com", score: 55, status: "Pending", projectTitle: "Blockchain Voting", problemStatement: "Secure digital voting system" },
        { team: "Team Epsilon", leader: "Charlie Lee", email: "charlie@example.com", score: 78, status: "Selected", projectTitle: "Health Tracker App", problemStatement: "Wearable-based health tracking" },
        { team: "Team Zeta", leader: "Diana King", email: "diana@example.com", score: 40, status: "Pending", projectTitle: "Smart Home IoT", problemStatement: "IoT automation for energy saving" },
        { team: "Team Eta", leader: "Ethan White", email: "ethan@example.com", score: 82, status: "Selected", projectTitle: "Mental Health App", problemStatement: "AI-powered mental health support" },
        { team: "Team Theta", leader: "Fiona Green", email: "fiona@example.com", score: 50, status: "Non-Selected", projectTitle: "Traffic Management System", problemStatement: "Smart traffic light optimization" },
    ]);

    // Evaluators data
    const [evaluators] = useState([
        { id: 101, name: "Dr. Eva Green", status: "Approved" },
        { id: 102, name: "Prof. Mark Lee", status: "Approved" },
        { id: 103, name: "Ms. Chloe Wu", status: "Pending" },
        { id: 104, name: "Mr. David Chen", status: "Approved" },
    ]);

    // Update team
    const updateTeam = (updatedTeam) => {
        setRegistrations(prev =>
            prev.map(team =>
                team.team === updatedTeam.team ? { ...team, ...updatedTeam } : team
            )
        );
    };

    // Filters
    const getPendingTeams = () => registrations.filter(t => t.status === "Pending");
    const getSelectedTeams = () => registrations.filter(t => t.status === "Selected");
    const getNonSelectedTeams = () => registrations.filter(t => t.status === "Non-Selected");

    // Dashboard stats
    const getStats = () => ({
        totalRegistrations: registrations.length,
        applications: registrations.filter(r => r.problemStatement).length,
        selected: getSelectedTeams().length,
        nonSelected: getNonSelectedTeams().length,
        pending: getPendingTeams().length,
        evaluators: evaluators.filter(e => e.status === "Approved").length,
    });

    return (
        <AdminContext.Provider
            value={{
                admin,
                setAdmin,
                registrations,
                evaluators,
                updateTeam,
                getPendingTeams,
                getSelectedTeams,
                getNonSelectedTeams,
                getStats,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
