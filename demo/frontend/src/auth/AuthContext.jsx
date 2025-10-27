import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('auth')
      if (saved) {
        const { user, token } = JSON.parse(saved)
        setUser(user)
        setToken(token)
      }
    } catch (error) {
      console.error('Error loading auth:', error)
      localStorage.removeItem('auth')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('auth', JSON.stringify({ user: userData, token: userToken }))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth')
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}