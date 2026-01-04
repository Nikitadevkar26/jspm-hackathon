const BASE_URL = "http://localhost:5001/api/send-email";

/**
 * Send email to a team
 * @param {Object} emailData - { to, subject, text, html }
 * @returns {Promise<Object>}
 */
export async function sendEmail(emailData) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send email");
    }

    return res.json();
  } catch (error) {
    console.error("sendEmail error:", error.message);
    throw error;
  }
}
