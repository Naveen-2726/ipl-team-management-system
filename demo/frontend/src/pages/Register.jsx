import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Trophy, User, Lock, Mail, ArrowLeft, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    
    // Check if user already exists
    if (users.find(user => user.username === formData.username || user.email === formData.email)) {
      toast.error('Username or email already exists')
      setLoading(false)
      return
    }
    
    // Add new user
    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: 'USER'
    }
    
    users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    
    setTimeout(() => {
      toast.success('Registration successful! Please login.')
      navigate('/login')
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-orange-200 transition-colors z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <img src="/logos/ipl logo.png" alt="IPL" className="w-6 h-6 rounded" />
        <span className="font-semibold">IPL Teams</span>
      </motion.button>

      <div className="w-full max-w-md">
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <img src="/logos/ipl logo.png" alt="IPL" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Join IPL Teams</h1>
            <p className="text-blue-100">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-blue-200 hover:text-white transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register