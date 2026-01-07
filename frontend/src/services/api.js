// const BASE_URL = "http://localhost:8088/api"; // Replace with your backend URL

// // Helper function to handle responses
// async function handleResponse(response) {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "API request failed");
//   }
//   return response.json();
// }

// // Helper to get auth headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("adminToken");
//   return {
//     "Content-Type": "application/json",
//     "Authorization": token ? `Bearer ${token}` : ""
//   };
// };

// // Fetch all registrations
// export async function getRegistrations() {
//   const response = await fetch(`${BASE_URL}/registrations`, {
//     headers: getAuthHeaders()
//   });
//   return handleResponse(response);
// }

// // Fetch a single team by ID
// export async function getTeam(id) {
//   const response = await fetch(`${BASE_URL}/registrations/${id}`, {
//     headers: getAuthHeaders()
//   });
//   return handleResponse(response);
// }

// // Update team score/status
// export async function updateTeam(teamId, data) {
//   const response = await fetch(`${BASE_URL}/registrations/${teamId}`, {
//     method: "PUT",
//     headers: getAuthHeaders(),
//     body: JSON.stringify(data),
//   });
//   return handleResponse(response);
// }

// // Send confirmation or rejection email
// export async function sendEmail(emailData) {
//   const response = await fetch(`${BASE_URL}/send-email`, {
//     method: "POST",
//     headers: getAuthHeaders(),
//     body: JSON.stringify(emailData),
//   });
//   return handleResponse(response);
// }

// // Add a new registration (optional)
// export async function addRegistration(data) {
//   const response = await fetch(`${BASE_URL}/registrations`, {
//     method: "POST",
//     headers: getAuthHeaders(),
//     body: JSON.stringify(data),
//   });
//   return handleResponse(response);
// }

// // Delete a registration (optional)
// export async function deleteRegistration(teamId) {
//   const response = await fetch(`${BASE_URL}/registrations/${teamId}`, {
//     method: "DELETE",
//     headers: getAuthHeaders()
//   });
//   return handleResponse(response);
// }


import axios from "axios";

const BASE_URL = "http://localhost:8088/api"; // Replace with your backend URL

// Helper function to handle responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
}

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
};

// Fetch all registrations
export async function getRegistrations() {
  const response = await axios.get(`${BASE_URL}/registrations`, {
    headers: getAuthHeaders()
  });
  return response.data;
}

// Fetch a single team by ID
export async function getTeam(id) {
  const response = await axios.get(`${BASE_URL}/registrations/${id}`, {
    headers: getAuthHeaders()
  });
  return response.data;
}

// Update team score/status
export async function updateTeam(teamId, data) {
  const response = await axios.put(
    `${BASE_URL}/registrations/${teamId}`,
    data,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

// Send confirmation or rejection email
export async function sendEmail(emailData) {
  const response = await axios.post(
    `${BASE_URL}/send-email`,
    emailData,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

// Add a new registration (optional)
export async function addRegistration(data) {
  const response = await axios.post(
    `${BASE_URL}/registrations`,
    data,
    { headers: getAuthHeaders() }
  );
  return response.data;
}

// Delete a registration (optional)
export async function deleteRegistration(teamId) {
  const response = await axios.delete(
    `${BASE_URL}/registrations/${teamId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
}
