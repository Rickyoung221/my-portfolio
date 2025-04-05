import { NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  PUBLIC_KEY: "qlrGWyjsdHevNChv6",
  TEMPLATE_ID: "template_d540mj5",
  SERVICE_ID: "service_z6qunbl",
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 使用 EmailJS 发送邮件
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
} 