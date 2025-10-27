import nodemailer, { Transporter } from "nodemailer";

import { getServerEnv } from "@/shared/config/server-env";

let transporterPromise: Promise<Transporter> | null = null;

async function createTransporter() {
  const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_SECURE,
  } = getServerEnv();

  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: EMAIL_SERVER_PORT,
    secure: EMAIL_SERVER_SECURE,
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    console.error("[Email] Не удалось верифицировать SMTP соединение", error);
  }

  return transporter;
}

export async function getEmailTransporter(): Promise<Transporter> {
  if (!transporterPromise) {
    transporterPromise = createTransporter();
  }

  return transporterPromise;
}
