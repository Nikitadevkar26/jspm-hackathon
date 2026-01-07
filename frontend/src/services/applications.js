import axios from "axios";

const BASE_URL = "http://localhost:8088/api/applications";

// Optional: get auth header (safe even if token doesn't exist)
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("evaluatorToken");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ============================
   GET ALL APPLICATIONS
============================ */
export async function getApplications() {
  const { data } = await axios.get(BASE_URL, {
    headers: getAuthHeaders(),
  });
  return data;
}

/* ============================
   GET SINGLE APPLICATION
============================ */
export async function getApplication(id) {
  const { data } = await axios.get(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return data;
}

/* ============================
   ADD APPLICATION
============================ */
export async function addApplication(payload) {
  const { data } = await axios.post(BASE_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return data;
}

/* ============================
   UPDATE APPLICATION
============================ */
export async function updateApplication(id, payload) {
  const { data } = await axios.put(`${BASE_URL}/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return data;
}

/* ============================
   DELETE APPLICATION
============================ */
export async function deleteApplication(id) {
  const { data } = await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return data;
}
