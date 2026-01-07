import axios from "axios";

const BASE_URL = "http://localhost:8088/api"; // backend base URL

// Create axios instance (clean & reusable)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically (safe even if token doesn't exist)
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("evaluatorToken") ||
    localStorage.getItem("teamToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= API FUNCTIONS ================= */

// Fetch all registrations
export async function getRegistrations() {
  const { data } = await api.get("/registrations");
  return data;
}

// Fetch a single team by ID
export async function getTeam(id) {
  const { data } = await api.get(`/registrations/${id}`);
  return data;
}

// Update team score/status
export async function updateTeam(teamId, payload) {
  const { data } = await api.put(`/registrations/${teamId}`, payload);
  return data;
}

// Send confirmation or rejection email
export async function sendEmail(emailData) {
  const { data } = await api.post("/send-email", emailData);
  return data;
}

// Add a new registration (optional)
export async function addRegistration(payload) {
  const { data } = await api.post("/registrations", payload);
  return data;
}

// Delete a registration (optional)
export async function deleteRegistration(teamId) {
  const { data } = await api.delete(`/registrations/${teamId}`);
  return data;
}
