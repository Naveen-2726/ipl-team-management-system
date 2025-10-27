import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const AnimatedCounter = ({ end, duration = 2, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration])

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

export const AnimatedStatCard = ({ icon: Icon, value, label, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">
            <AnimatedCounter end={value} />
          </div>
          <div className="text-sm text-gray-600 font-medium">{label}</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className={`h-2 bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}