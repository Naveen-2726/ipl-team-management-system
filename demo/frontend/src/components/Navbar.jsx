import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../auth/AuthContext'
import { 
  Trophy, Users, Calendar, BarChart3, Menu, X, LogOut,
  Settings, User, Shield, Home, Target, Bell, Search, ChevronDown
} from 'lucide-react'


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const publicNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Teams', href: '/teams' },
    { name: 'Players', href: '/players' },
    { name: 'Matches', href: '/matches' },
    { name: 'Analytics', href: '/analytics' },
  ]

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Teams', href: '/teams' },
    { name: 'Players', href: '/players' },
    { name: 'Squads', href: '/squads' },
    { name: 'Matches', href: '/matches' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Evaluations', href: '/evaluations' },
  ]

  const adminNavigation = [
    { name: 'Admin', href: '/admin' },
    { name: 'Teams', href: '/admin/teams' },
    { name: 'Players', href: '/admin/players' },
    { name: 'Squads', href: '/squads' },
    { name: 'Matches', href: '/admin/matches' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Evaluations', href: '/evaluations' },
  ]

  const getNavigation = () => {
    if (!user) return publicNavigation
    if (user.role === 'ADMIN') return adminNavigation
    return userNavigation
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileOpen(false)
  }

  const isActive = (href) => location.pathname === href

  if (['/login', '/register'].includes(location.pathname)) {
    return null
  }

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* IPL Logo and Branding */}
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
            <img src="/logos/ipl%20logo.png" alt="IPL" className="w-12 h-12 mr-3 rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">
                IPL
              </h1>
              <p className="text-xs text-blue-200 font-medium tracking-wider uppercase">
                Team Management
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {getNavigation().map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'bg-white text-blue-900 shadow-xl transform scale-105' 
                    : 'text-blue-100 hover:text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-blue-100 font-semibold hidden sm:block text-base">
                  Welcome, {user.username}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-blue-900" />
                    </div>
                    <ChevronDown className="w-3 h-3 text-blue-200" />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-medium text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 border border-white/30 backdrop-blur-sm hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-xl transform hover:scale-105"
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-blue-100 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-blue-700 py-6"
            >
              <div className="space-y-3">
                {getNavigation().map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'bg-white text-blue-900' 
                        : 'text-blue-100 hover:bg-white/20 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!user && (
                  <div className="pt-6 border-t border-blue-700 space-y-3">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-sm font-medium text-blue-100 hover:bg-white/20 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar