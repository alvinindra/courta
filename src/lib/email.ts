import nodemailer from 'nodemailer'

// Create a transport using an email service provider (e.g., Gmail, SendGrid, SMTP server)
export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER, // Your email user (environment variable)
    pass: process.env.EMAIL_PASS // Your email password (environment variable)
  }
})

// Send email utility function
export async function sendEmail({
  to,
  subject,
  text,
  html
}: {
  to: string
  subject: string
  text?: string
  html?: string
}) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to,
      subject,
      text,
      html
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: %s', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}
