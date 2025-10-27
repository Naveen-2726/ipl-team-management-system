import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Trophy, Users, Calendar } from 'lucide-react'

const EnhancedNotificationToast = ({ notifications, onRemove }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />
      case 'error': return <AlertCircle className="w-5 h-5" />
      case 'warning': return <AlertTriangle className="w-5 h-5" />
      case 'info': return <Info className="w-5 h-5" />
      case 'trophy': return <Trophy className="w-5 h-5" />
      case 'users': return <Users className="w-5 h-5" />
      case 'calendar': return <Calendar className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  const getColors = (type) => {
    switch (type) {
      case 'success': 
        return {
          bg: 'from-green-500 to-emerald-600',
          border: 'border-green-400',
          text: 'text-white'
        }
      case 'error': 
        return {
          bg: 'from-red-500 to-rose-600',
          border: 'border-red-400',
          text: 'text-white'
        }
      case 'warning': 
        return {
          bg: 'from-yellow-500 to-orange-600',
          border: 'border-yellow-400',
          text: 'text-white'
        }
      case 'info': 
        return {
          bg: 'from-blue-500 to-indigo-600',
          border: 'border-blue-400',
          text: 'text-white'
        }
      case 'trophy': 
        return {
          bg: 'from-yellow-500 to-amber-600',
          border: 'border-yellow-400',
          text: 'text-white'
        }
      case 'users': 
        return {
          bg: 'from-purple-500 to-violet-600',
          border: 'border-purple-400',
          text: 'text-white'
        }
      case 'calendar': 
        return {
          bg: 'from-cyan-500 to-blue-600',
          border: 'border-cyan-400',
          text: 'text-white'
        }
      default: 
        return {
          bg: 'from-gray-500 to-slate-600',
          border: 'border-gray-400',
          text: 'text-white'
        }
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = getColors(notification.type)
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className={`bg-gradient-to-r ${colors.bg} ${colors.text} p-4 rounded-2xl shadow-2xl border ${colors.border} backdrop-blur-sm`}
              style={{
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 mt-0.5"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {getIcon(notification.type)}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {notification.title && (
                    <motion.h4
                      className="font-bold text-sm mb-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {notification.title}
                    </motion.h4>
                  )}
                  <motion.p
                    className="text-sm opacity-90 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {notification.message}
                  </motion.p>
                  
                  {notification.action && (
                    <motion.button
                      className="mt-2 text-xs font-semibold underline hover:no-underline transition-all duration-200"
                      onClick={notification.action.onClick}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {notification.action.label}
                    </motion.button>
                  )}
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={() => onRemove(notification.id)}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Progress Bar */}
              {notification.duration && (
                <motion.div
                  className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    className="h-full bg-white/60 rounded-full"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ 
                      duration: notification.duration / 1000,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedNotificationToast