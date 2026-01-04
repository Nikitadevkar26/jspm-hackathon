const BASE_URL = "http://localhost:5001/api/registrations";

// Get all registrations
export async function getRegistrations() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch registrations");
  return res.json();
}

// Get a single registration by ID
export async function getRegistration(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch registration");
  return res.json();
}

// Add a new registration
export async function addRegistration(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add registration");
  return res.json();
}

// Update registration (score/status)
export async function updateRegistration(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update registration");
  return res.json();
}

// Delete registration
export async function deleteRegistration(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete registration");
  return res.json();
}
