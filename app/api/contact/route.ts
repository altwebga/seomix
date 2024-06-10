// app/api/contact/route.ts
'use server'
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { name, phone, message } = await request.json();

  // Настройка транспортера nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Настройки email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SEND_TO,
    subject: 'Новое сообщение с контактной формы',
    text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`,
  };

  try {
    // Отправка email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Сообщение отправлено успешно' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return NextResponse.json({ message: 'Ошибка при отправке сообщения' }, { status: 500 });
  }
}
