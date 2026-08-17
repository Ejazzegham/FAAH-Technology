import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This route sends a real email notification to the business inbox whenever
// someone submits the contact form. It requires two environment variables:
//
//   EMAIL_USER          the Gmail address that sends the notification
//   EMAIL_APP_PASSWORD   a 16-character Gmail "App Password" (NOT your normal
//                        Gmail password — see README for how to create one)
//
// Set these in .env.local for local development, and in your hosting
// provider's environment variable settings (e.g. Vercel Project Settings ->
// Environment Variables) for production. Without them this route responds
// with a clear error instead of failing silently, and the contact form still
// saves the message to Firestore either way.

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hztechnology999@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailPass) {
      console.error(
        "Contact form email not sent: EMAIL_USER / EMAIL_APP_PASSWORD are not set in the environment."
      );
      return NextResponse.json(
        { error: "Email is not configured on the server yet." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"FAAH Technology Website" <${emailUser}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New website inquiry: ${subject || "No subject"}`,
      text: `You have a new message from the FAAH Technology contact form.

Name: ${name}
Email: ${email}
Subject: ${subject || "(none)"}

Message:
${message}`,
      html: `
        <div style="font-family: sans-serif; color:#1a1a1a; line-height:1.6;">
          <h2 style="color:#b8863b;">New website inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email failed:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
