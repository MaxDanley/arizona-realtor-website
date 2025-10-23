'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Loader2, ArrowLeft } from 'lucide-react'
import { FadeInUp, ScaleIn } from '@/components/animations'
import { Navigation } from '@/components/navigation'

export default function VerifyEmail() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Verification code sent to your email!')
        setStep('code')
      } else {
        setError(data.error || 'Failed to send verification code')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Email verified successfully! You can now sign in.')
        setTimeout(() => {
          router.push('/auth/signin')
        }, 2000)
      } else {
        setError(data.error || 'Invalid verification code')
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
              <Mail className="h-12 w-12 text-black" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {step === 'email' ? 'Verify Your Email' : 'Enter Verification Code'}
          </h2>
          <p className="text-teal-200">
            {step === 'email' 
              ? 'Enter your email to receive a verification code'
              : 'Check your email and enter the 6-digit code'
            }
          </p>
        </FadeInUp>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ScaleIn>
          <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
            
            {step === 'email' ? (
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
                      'Send Verification Code'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleCodeSubmit}>
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
                    Verification Code
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
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading || code.length !== 6}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Email'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="w-full flex justify-center py-3 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 backdrop-blur-sm transition-all duration-300"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Email
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
                  <span className="px-2 bg-transparent text-teal-200">Already verified?</span>
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
