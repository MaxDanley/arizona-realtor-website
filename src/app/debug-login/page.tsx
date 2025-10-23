'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
}

interface TestUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function LoginDebugPage() {
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [testUser, setTestUser] = useState<TestUser>({
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User'
  })

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setIsLoading(true)
    try {
      const result = await testFunction()
      
      // Check if the result indicates failure
      const isSuccess = result && (
        result.success === true || 
        (result.success === undefined && !result.error && !result.message?.includes('MISSING'))
      )
      
      setTestResults((prev) => ({ 
        ...prev, 
        [testName]: { 
          success: isSuccess, 
          data: result,
          error: isSuccess ? undefined : (result.error || result.message || 'Unknown error')
        } 
      }))
    } catch (error) {
      setTestResults((prev) => ({ 
        ...prev, 
        [testName]: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        } 
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const testEnvironmentVariables = async () => {
    const response = await fetch('/api/debug?key=debug123')
    return await response.json()
  }

  const testDatabaseConnection = async () => {
    const response = await fetch('/api/test-db')
    return await response.json()
  }

  const createTestUser = async () => {
    const response = await fetch('/api/create-test-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    })
    return await response.json()
  }

  const testLoginAPI = async () => {
    const response = await fetch('/api/test-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    })
    return await response.json()
  }

  const testNextAuthLogin = async () => {
    const result = await signIn('credentials', {
      email: testUser.email,
      password: testUser.password,
      redirect: false,
    })
    return result
  }

  const runAllTests = async () => {
    await runTest('Environment Variables', testEnvironmentVariables)
    await runTest('Database Connection', testDatabaseConnection)
    await runTest('Create Test User', createTestUser)
    await runTest('Login API Test', testLoginAPI)
    await runTest('NextAuth Login Test', testNextAuthLogin)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Login Debug Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test User Credentials</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={testUser.email}
                onChange={(e) => setTestUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={testUser.password}
                onChange={(e) => setTestUser(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={testUser.firstName}
                onChange={(e) => setTestUser(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={testUser.lastName}
                onChange={(e) => setTestUser(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={() => runAllTests()}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Running Tests...' : 'Run All Tests'}
            </button>
            <button
              onClick={() => runTest('Environment Variables', testEnvironmentVariables)}
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Test Environment Variables
            </button>
            <button
              onClick={() => runTest('Database Connection', testDatabaseConnection)}
              disabled={isLoading}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              Test Database
            </button>
            <button
              onClick={() => runTest('Create Test User', createTestUser)}
              disabled={isLoading}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50"
            >
              Create Test User
            </button>
            <button
              onClick={() => runTest('Login API Test', testLoginAPI)}
              disabled={isLoading}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              Test Login API
            </button>
            <button
              onClick={() => runTest('NextAuth Login Test', testNextAuthLogin)}
              disabled={isLoading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Test NextAuth
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          {Object.keys(testResults).length === 0 ? (
            <p className="text-gray-500">No tests run yet. Click a test button above.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(testResults).map(([testName, result]) => (
                <div key={testName} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {testName}
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? 'SUCCESS' : 'FAILED'}
                    </span>
                  </h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
