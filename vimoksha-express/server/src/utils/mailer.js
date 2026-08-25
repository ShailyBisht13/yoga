import nodemailer from 'nodemailer';

// Reads credentials from environment variables — never hardcode them.
// Add these to your .env file (see .env.example):
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_USER=youraddress@gmail.com
//   SMTP_PASS=your-16-char-app-password
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error('SMTP config error — emails will NOT send:', err.message);
  } else {
    console.log('SMTP transporter ready to send emails.');
  }
});

const statusCopy = {
  confirmed: {
    subject: 'Your trial booking is confirmed 🎉',
    heading: 'Booking Confirmed',
    body: 'Great news! Your trial booking has been confirmed. We look forward to seeing you.',
  },
  cancelled: {
    subject: 'Update on your trial booking',
    heading: 'Booking Cancelled',
    body: 'Unfortunately your trial booking has been cancelled. If you think this is a mistake, please reach out to us.',
  },
  pending: {
    subject: 'Your trial booking is under review',
    heading: 'Booking Pending',
    body: 'Your trial booking status has been set back to pending. We will confirm shortly.',
  },
};

export async function sendBookingStatusEmail(booking) {
  if (!booking.email) return; // nothing to send to

  const copy = statusCopy[booking.status];
  if (!copy) return;

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
      <h2 style="color:#8B2E14;">${copy.heading}</h2>
      <p>Hi ${booking.name || 'there'},</p>
      <p>${copy.body}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p style="font-size:13px;color:#665C54;">
        Batch: ${booking.preferredBatch || '—'}<br/>
        Phone: ${booking.phone || '—'}
      </p>
    </div>
  `;

  console.log(`Attempting to send "${booking.status}" status email to ${booking.email}...`);

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: booking.email,
      subject: copy.subject,
      html,
    });
    console.log('Email sent successfully:', info.messageId);
  } catch (err) {
    // Don't let a mail failure break the status update itself
    console.error('Failed to send booking status email:', err.message);
  }
}