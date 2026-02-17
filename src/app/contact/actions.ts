'use server'

import nodemailer from 'nodemailer'
import { redirect } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'

async function persistMessage(data: {
  name: string
  email: string
  phone: string
  topic: string
  message: string
}) {
  try {
    const storePath = path.join(process.cwd(), 'storage', 'contact-messages.json')
    const dir = path.dirname(storePath)
    await fs.mkdir(dir, { recursive: true })
    type ContactEntry = {
      name: string
      email: string
      phone: string
      topic: string
      message: string
      created_at: string
    }
    let current: ContactEntry[] = []
    try {
      const raw = await fs.readFile(storePath, 'utf-8')
      const parsed = JSON.parse(raw)
      current = Array.isArray(parsed) ? parsed as ContactEntry[] : []
    } catch {}
    const entry = {
      ...data,
      created_at: new Date().toISOString(),
    }
    await fs.writeFile(storePath, JSON.stringify([entry, ...current], null, 2), 'utf-8')
    return true
  } catch (e) {
    console.error('Persist contact message failed:', e)
    return false
  }
}

export async function sendContact(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const topic = String(formData.get('topic') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    redirect('/contact?error=Please%20fill%20name,%20email%20and%20message')
  }

  try {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.MAIL_TO
    const fromAddress = process.env.MAIL_FROM || user

    if (!host || !user || !pass || !to) {
      const ok = await persistMessage({ name, email, phone, topic, message })
      if (ok) {
        redirect('/contact?success=1')
      } else {
        redirect('/contact?error=Mail%20server%20not%20configured')
      }
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: fromAddress,
      replyTo: email || undefined,
      to,
      subject: `Contact: ${topic || 'General Inquiry'}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Topic: ${topic}

Message:
${message}`,
    })

    redirect('/contact?success=1')
  } catch (err) {
    console.error('Contact send failed:', err)
    const ok = await persistMessage({ name, email, phone, topic, message })
    if (ok) {
      redirect('/contact?success=1')
    } else {
      redirect('/contact?error=Failed%20to%20send%20message')
    }
  }
}
