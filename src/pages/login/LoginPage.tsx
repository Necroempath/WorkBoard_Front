import { useState } from 'react'
import { useAuth } from '../../features/auth/auth.hooks'
import type { LoginParams, RegisterParams } from '../../features/auth/auth.api'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()
  
  const { signIn, signUp, loading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmationPassword] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLogin) {
      const params: LoginParams = { email, password }

      await signIn(params)

      navigate('/')
    } else {
      const params: RegisterParams = { name, email, password, confirmPassword }

      await signUp(params)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        {!isLogin && (
          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
          />
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>

        <div
          className="mt-4 text-sm text-blue-500 cursor-pointer text-center"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'No account? Register' : 'Have account? Login'}
        </div>
      </form>
    </div>
  )
}