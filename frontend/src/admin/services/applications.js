const BASE_URL = "http://localhost:5001/api/applications";

// Get all applications
export async function getApplications() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json();
}

// Get a single application by ID
export async function getApplication(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
}

// Add a new application
export async function addApplication(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add application");
  return res.json();
}

// Update application (score/status)
export async function updateApplication(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update application");
  return res.json();
}

// Delete application
export async function deleteApplication(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete application");
  return res.json();
}
