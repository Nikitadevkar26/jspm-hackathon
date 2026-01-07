import axios from "axios";

const BASE_URL = "http://localhost:8088/api/send-email";

/**
 * Send email to a team
 * @param {Object} emailData - { to, subject, text, html }
 * @returns {Promise<Object>}
 */
export async function sendEmail(emailData) {
  try {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("evaluatorToken");

    const { data } = await axios.post(BASE_URL, emailData, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return data;
  } catch (error) {
    console.error(
      "sendEmail error:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
