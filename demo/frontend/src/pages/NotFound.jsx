import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Trophy, Search } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-white/20 mb-4">404</div>
          <div className="text-6xl mb-6">🏏</div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-blue-200 mb-8"
        >
          Looks like this page got bowled out! The page you're looking for doesn't exist.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
            <Trophy className="w-5 h-5 mr-2" />
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <button
              onClick={() => navigate('/teams')}
              className="text-blue-200 hover:text-white transition-colors"
            >
              IPL Teams
            </button>
            <button
              onClick={() => navigate('/players')}
              className="text-blue-200 hover:text-white transition-colors"
            >
              Players
            </button>
            <button
              onClick={() => navigate('/matches')}
              className="text-blue-200 hover:text-white transition-colors"
            >
              Matches
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="text-blue-200 hover:text-white transition-colors"
            >
              Analytics
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound