import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Zap, Award } from 'lucide-react'

const PlayerStatsCard = ({ player }) => {
  const getStatIcon = (statType) => {
    switch (statType) {
      case 'runs': return <Target className="w-5 h-5" />
      case 'average': return <TrendingUp className="w-5 h-5" />
      case 'strikeRate': return <Zap className="w-5 h-5" />
      case 'wickets': return <Award className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getStatColor = (statType) => {
    switch (statType) {
      case 'runs': return 'from-blue-500 to-blue-600'
      case 'average': return 'from-green-500 to-green-600'
      case 'strikeRate': return 'from-orange-500 to-orange-600'
      case 'wickets': return 'from-purple-500 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const stats = [
    { label: 'Runs Scored', value: player.runsScored || 0, type: 'runs' },
    { label: 'Batting Average', value: player.battingAverage || 0, type: 'average' },
    { label: 'Strike Rate', value: player.strikeRate || 0, type: 'strikeRate' },
    { label: 'Wickets Taken', value: player.wicketsTaken || 0, type: 'wickets' }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${getStatColor(stat.type)} rounded-lg flex items-center justify-center text-white`}>
              {getStatIcon(stat.type)}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default PlayerStatsCard