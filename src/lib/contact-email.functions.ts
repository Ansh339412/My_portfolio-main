import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().min(1).max(300),
  message: z.string().trim().min(10).max(5000),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export const sendContactNotification = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Email service is not configured");
    }

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
        <h2 style="margin:0 0 16px">New contact form submission</h2>
        <p style="margin:4px 0"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:4px 0"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:4px 0"><strong>Subject:</strong> ${safeSubject}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
        <p style="margin:0 0 8px"><strong>Message:</strong></p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.5">${safeMessage}</p>
      </div>
    `;

    const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["anshpreetoneplus@gmail.com"],
        reply_to: data.email,
        subject: `New contact: ${data.subject}`,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Resend send failed", response.status, body);
      throw new Error(`Email send failed: ${response.status}`);
    }

    return { ok: true };
  });
