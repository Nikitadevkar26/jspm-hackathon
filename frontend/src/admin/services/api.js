const BASE_URL = "http://localhost:5001/api"; // Replace with your backend URL

// Helper function to handle responses
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API request failed");
    }
    return response.json();
}

// Fetch all registrations
export async function getRegistrations() {
    const response = await fetch(`${BASE_URL}/registrations`);
    return handleResponse(response);
}

// Fetch a single team by ID
export async function getTeam(id) {
    const response = await fetch(`${BASE_URL}/registrations/${id}`);
    return handleResponse(response);
}

// Update team score/status
export async function updateTeam(teamId, data) {
    const response = await fetch(`${BASE_URL}/registrations/${teamId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

// Send confirmation or rejection email
export async function sendEmail(emailData) {
    const response = await fetch(`${BASE_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
    });
    return handleResponse(response);
}

// Add a new registration (optional)
export async function addRegistration(data) {
    const response = await fetch(`${BASE_URL}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

// Delete a registration (optional)
export async function deleteRegistration(teamId) {
    const response = await fetch(`${BASE_URL}/registrations/${teamId}`, {
        method: "DELETE",
    });
    return handleResponse(response);
}
