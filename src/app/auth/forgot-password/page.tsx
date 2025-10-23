'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import { FadeInUp, ScaleIn } from '@/components/animations'
import { Navigation } from '@/components/navigation'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [step, setStep] = useState<'email' | 'code' | 'password' | 'success'>('email')
  const [canResend, setCanResend] = useState(true)
  const [resendCooldown, setResendCooldown] = useState(0)
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess('Password reset code has been sent to your email.')
        setStep('code')
        setCanResend(false)
        setResendCooldown(60) // 60 second cooldown
        startResendCooldown()
      } else {
        setError(data.error || 'Failed to send reset code')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const startResendCooldown = () => {
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleResendCode = async () => {
    if (!canResend) return
    
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/resend-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess('New password reset code has been sent to your email.')
        setCanResend(false)
        setResendCooldown(60) // 60 second cooldown
        startResendCooldown()
      } else {
        setError(data.error || 'Failed to resend code')
      }
    } catch {
      setError('An error occurred while resending code.')
    } finally {
      setIsLoading(false)
    }
  }


  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password reset successfully! You can now sign in.')
        setStep('success')
        setTimeout(() => {
          router.push('/auth/signin')
        }, 3000)
      } else {
        setError(data.error || 'Invalid reset code')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 relative overflow-hidden">
      <Navigation />
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <FadeInUp className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-lime-400 p-3 rounded-full">
              <Lock className="h-12 w-12 text-black" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {step === 'email' && 'Reset Your Password'}
            {step === 'code' && 'Enter Reset Code'}
            {step === 'password' && 'Set New Password'}
            {step === 'success' && 'Password Reset Complete'}
          </h2>
          <p className="text-teal-200">
            {step === 'email' && 'Enter your email to receive a password reset code'}
            {step === 'code' && 'Check your email and enter the 6-digit code'}
            {step === 'password' && 'Enter your new password'}
            {step === 'success' && 'Your password has been reset successfully'}
          </p>
        </FadeInUp>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ScaleIn>
          <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
            
            {step === 'success' ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Success!</h3>
                  <p className="text-teal-200">Your password has been reset successfully. Redirecting to sign in...</p>
                </div>
              </div>
            ) : step === 'email' ? (
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                {error && (
                  <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-500/20 border border-green-400 text-green-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-teal-300 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Sending Code...
                      </>
                    ) : (
                      'Send Reset Code'
                    )}
                  </button>
                </div>
              </form>
            ) : step === 'code' ? (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('password'); }}>
                {error && (
                  <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-500/20 border border-green-400 text-green-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-white mb-2">
                    Reset Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className="appearance-none block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-teal-300 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 backdrop-blur-sm transition-all duration-300 text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                  <p className="text-teal-300 text-sm mt-2">
                    Enter the 6-digit code sent to {email}
                  </p>
                  <p className="text-orange-300 text-xs mt-1">
                    Code expires in 5 minutes
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={code.length !== 6}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    Continue
                  </button>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={!canResend || isLoading}
                      className="flex-1 flex justify-center py-3 px-4 border border-lime-400/50 rounded-lg shadow-sm text-sm font-medium text-lime-400 bg-lime-400/10 hover:bg-lime-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {canResend ? (
                        'Resend Code'
                      ) : (
                        `Resend in ${resendCooldown}s`
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="flex-1 flex justify-center py-3 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 backdrop-blur-sm transition-all duration-300"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                {error && (
                  <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-500/20 border border-green-400 text-green-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-teal-300 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-teal-300 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 6}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('code')}
                    className="w-full flex justify-center py-3 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 backdrop-blur-sm transition-all duration-300"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Code
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-teal-200">Remember your password?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/auth/signin"
                  className="w-full flex justify-center py-3 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 backdrop-blur-sm transition-all duration-300"
                >
                  Sign in to your account
                </Link>
              </div>
            </div>
          </div>
        </ScaleIn>
        </div>
      </div>
    </div>
  )
}
