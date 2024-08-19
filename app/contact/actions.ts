"use server";

import nodemailer from "nodemailer";

type ContactFormData = {
  name: string;
  phone: string;
  message?: string;
};

export async function sendContactForm(data: ContactFormData) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true для порта 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: "Новая заявка с формы обратной связи",
    text: `Имя: ${data.name}\nТелефон: ${data.phone}\nСообщение: ${data.message || "Нет сообщения"}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);

    return { success: false, error: "Ошибка при отправке письма" };
  }
}
