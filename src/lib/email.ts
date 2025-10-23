import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailTemplate {
  to: string
  subject: string
  html: string
}

export class EmailService {
  static async sendVerificationCode(email: string, code: string, firstName: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0d9488, #14b8a6); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Arizona Real Estate Academy</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Email Verification</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Welcome ${firstName}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for signing up for Arizona Real Estate Academy. To complete your registration, 
            please verify your email address using the code below:
          </p>
          
          <div style="background: white; border: 2px solid #0d9488; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your verification code:</p>
            <h1 style="margin: 0; color: #0d9488; font-size: 32px; letter-spacing: 4px; font-family: monospace;">${code}</h1>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
            This code will expire in 15 minutes. If you didn't request this verification, 
            please ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          <p>Arizona Real Estate Academy - Your Path to Real Estate Success</p>
        </div>
      </div>
    `

    return await resend.emails.send({
      from: 'Arizona Real Estate Academy <noreply@arizonarealestateacademy.com>',
      to: email,
      subject: 'Verify Your Email - Arizona Real Estate Academy',
      html
    })
  }

  static async sendPasswordResetCode(email: string, code: string, firstName: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Arizona Real Estate Academy</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Password Reset</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Password Reset Request</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
            Hi ${firstName}, we received a request to reset your password. Use the code below to reset your password:
          </p>
          
          <div style="background: white; border: 2px solid #dc2626; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your reset code:</p>
            <h1 style="margin: 0; color: #dc2626; font-size: 32px; letter-spacing: 4px; font-family: monospace;">${code}</h1>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
            This code will expire in 15 minutes. If you didn't request this password reset, 
            please ignore this email and your password will remain unchanged.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          <p>Arizona Real Estate Academy - Your Path to Real Estate Success</p>
        </div>
      </div>
    `

    return await resend.emails.send({
      from: 'Arizona Real Estate Academy <noreply@arizonarealestateacademy.com>',
      to: email,
      subject: 'Password Reset Code - Arizona Real Estate Academy',
      html
    })
  }
}
