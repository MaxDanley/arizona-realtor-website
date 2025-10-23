import crypto from 'crypto'

export class CodeGenerator {
  static generateVerificationCode(): string {
    // Generate a 6-digit numeric code
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  static generatePasswordResetCode(): string {
    // Generate a 6-digit numeric code
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  static generateSecureToken(): string {
    // Generate a secure random token for additional security
    return crypto.randomBytes(32).toString('hex')
  }

  static isCodeExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt
  }

  static getExpirationTime(minutes: number = 15): Date {
    const now = new Date()
    return new Date(now.getTime() + minutes * 60 * 1000)
  }
}
