import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({
  to,
  bcc,
  subject,
  html,
}: {
  to: string | string[]
  bcc?: string | string[]
  subject: string
  html: string
}) {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP credentials not configured. Email not sent.')
      return { success: false, error: 'SMTP not configured' }
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"HowToHub.bd" <noreply@howtohub.bd>',
      to,
      bcc,
      subject,
      html,
    })

    console.log('Message sent: %s', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
