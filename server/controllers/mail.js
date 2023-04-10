import { sendEmail } from "../utils/sendEmail.js";

export const sendMail = async (req, res, next) => {
  const { email, name } = req.body;
  console.log("REQ BODY", req.body);
  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "🚛 Rota Oluşturldu.";
    const message = `
          <h3>Merhaba ${name} ✋</h3>
          <p>Rota Oluşturldu. Aracın yola çıktı.</p>
      `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Gönderildi" });
  } catch (error) {
    next(error);
  }
};
