const transporter = require("../../utils/mailer");
const Evaluator = require("../../models/admin/evaluatorModel");

/* ================================
   SEND EVALUATOR STATUS EMAIL
================================ */
async function sendEvaluatorEmail(req, res) {
  try {
    const { to, subject, message } = req.body;
    const evaluatorId = req.params.id;

    if (!to || !subject || !message) {
      return res.status(400).json({ error: "Missing email fields" });
    }

    const evaluator = await Evaluator.getById(evaluatorId);
    if (!evaluator) {
      return res.status(404).json({ error: "Evaluator not found" });
    }

    await transporter.sendMail({
      from: `"Evaluation Committee" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text: message
    });

    res.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}

module.exports = sendEvaluatorEmail;
