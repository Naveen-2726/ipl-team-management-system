import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, TrendingUp, Users, Trophy, Target, Award, 
  Calendar, Zap, Star, Crown, Filter, Download,
  PieChart, Activity, ArrowUp, ArrowDown, Minus
} from 'lucide-react'
import { RealTimeLineChart, RealTimeDonutChart, RealTimeBarChart } from '../components/RealTimeCharts'
import EnhancedLoadingScreen from '../components/EnhancedLoadingScreen'
import { TeamLogo } from '../utils/logoUtils'

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Season')
  const [loading, setLoading] = useState(true)
  const [filteredStats, setFilteredStats] = useState([])
  const [filteredBatsmen, setFilteredBatsmen] = useState([])
  const [filteredBowlers, setFilteredBowlers] = useState([])

  const periods = ['Last 7 Days', 'Last Month', 'Season', 'All Time']

  // Filter data based on selected period
  useEffect(() => {
    filterDataByPeriod()
  }, [selectedPeriod])

  const filterDataByPeriod = () => {
    let multiplier = 1
    switch(selectedPeriod) {
      case 'Last 7 Days': multiplier = 0.1; break
      case 'Last Month': multiplier = 0.3; break
      case 'Season': multiplier = 1; break
      case 'All Time': multiplier = 1.5; break
    }

    const newStats = stats.map(stat => ({
      ...stat,
      value: Math.floor(parseInt(stat.value.replace(/,/g, '')) * multiplier).toLocaleString()
    }))

    const newBatsmen = topBatsmen.map(player => ({
      ...player,
      runs: Math.floor(player.runs * multiplier),
      average: (player.average * multiplier).toFixed(1)
    }))

    const newBowlers = topBowlers.map(player => ({
      ...player,
      wickets: Math.floor(player.wickets * multiplier),
      economy: (player.economy / multiplier).toFixed(1)
    }))

    setFilteredStats(newStats)
    setFilteredBatsmen(newBatsmen)
    setFilteredBowlers(newBowlers)
  }

  // Export functionality
  const handleExport = () => {
    console.log('Export button clicked!')
    alert('Export function called!')
    
    try {
      // Simple test first
      const testData = 'Metric,Value,Period\nTotal Runs,45672,Season\nTotal Wickets,1248,Season'
      
      // Create and download file
      const blob = new Blob([testData], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'IPL_Analytics_Export.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      console.log('Export completed successfully')
    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed: ' + error.message)
    }
  }

  const stats = [
    { 
      label: 'Total Runs', 
      value: '45,672', 
      icon: Target, 
      color: 'from-blue-500 to-blue-600', 
      change: '+15.2%',
      trend: 'up',
      description: 'Runs scored this season'
    },
    { 
      label: 'Total Wickets', 
      value: '1,248', 
      icon: Award, 
      color: 'from-green-500 to-green-600', 
      change: '+8.7%',
      trend: 'up',
      description: 'Wickets taken this season'
    },
    { 
      label: 'Matches Played', 
      value: '74', 
      icon: Trophy, 
      color: 'from-purple-500 to-purple-600', 
      change: '0%',
      trend: 'stable',
      description: 'Total matches completed'
    },
    { 
      label: 'Strike Rate', 
      value: '142.8', 
      icon: Zap, 
      color: 'from-orange-500 to-orange-600', 
      change: '+3.2%',
      trend: 'up',
      description: 'Average strike rate'
    }
  ]

  const topBatsmen = [
    { name: 'Virat Kohli', team: 'RCB', runs: 8004, average: 37.8, strikeRate: 131.9 },
    { name: 'Rohit Sharma', team: 'MI', runs: 6628, average: 30.4, strikeRate: 130.7 },
    { name: 'Shikhar Dhawan', team: 'PBKS', runs: 6769, average: 35.2, strikeRate: 127.1 },
    { name: 'MS Dhoni', team: 'CSK', runs: 5082, average: 39.2, strikeRate: 135.9 },
    { name: 'KL Rahul', team: 'LSG', runs: 4683, average: 47.3, strikeRate: 134.6 }
  ]

  const topBowlers = [
    { name: 'Yuzvendra Chahal', team: 'RR', wickets: 205, economy: 7.8, average: 22.3 },
    { name: 'Bhuvneshwar Kumar', team: 'SRH', wickets: 181, economy: 7.3, average: 23.1 },
    { name: 'Jasprit Bumrah', team: 'MI', wickets: 165, economy: 7.4, average: 20.2 },
    { name: 'Sunil Narine', team: 'KKR', wickets: 158, economy: 6.8, average: 24.8 },
    { name: 'Ravindra Jadeja', team: 'CSK', wickets: 157, economy: 7.6, average: 28.1 }
  ]

  const teamPerformance = [
    { team: 'RR', wins: 11, losses: 3, points: 22, nrr: '+0.890', color: '#EA1A85' },
    { team: 'KKR', wins: 10, losses: 4, points: 20, nrr: '+0.789', color: '#3A225D' },
    { team: 'RCB', wins: 9, losses: 5, points: 18, nrr: '+0.567', color: '#EC1C24' },
    { team: 'GT', wins: 9, losses: 5, points: 18, nrr: '+0.345', color: '#1C2841' },
    { team: 'CSK', wins: 8, losses: 6, points: 16, nrr: '+0.245', color: '#FFFF00' }
  ]

  const matchStats = [
    { category: 'Highest Score', value: '263/5', team: 'RCB vs PBKS', icon: Target },
    { category: 'Best Bowling', value: '5/5', team: 'Mustafizur Rahman', icon: Award },
    { category: 'Most Sixes', value: '17', team: 'RCB vs MI', icon: Zap },
    { category: 'Closest Win', value: '1 Run', team: 'GT vs RR', icon: Trophy }
  ]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <ArrowUp className="w-4 h-4" />
      case 'down': return <ArrowDown className="w-4 h-4" />
      default: return <Minus className="w-4 h-4" />
    }
  }

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (loading) {
    return <EnhancedLoadingScreen message="Loading analytics dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Analytics Dashboard
                </h1>
                <p className="text-xl text-blue-100">
                  Deep insights and performance metrics from the IPL
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-6 lg:mt-0">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {periods.map(period => (
                    <option key={period} value={period} className="text-gray-900">{period}</option>
                  ))}
                </select>
                <button 
                  onClick={handleExport}
                  className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(filteredStats.length > 0 ? filteredStats : stats).map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center text-sm font-semibold ${getTrendColor(stat.trend)}`}>
                  {getTrendIcon(stat.trend)}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Top Batsmen */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                Top Batsmen
              </h2>
              <Target className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {(filteredBatsmen.length > 0 ? filteredBatsmen : topBatsmen).map((player, index) => (
                <div key={player.name} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <TeamLogo 
                      teamName={player.team} 
                      size="w-8 h-8" 
                      className="rounded object-cover"
                    />
                    <div className="text-2xl hidden">{player.avatar}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-600">{player.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{player.runs}</p>
                    <p className="text-xs text-gray-600">SR: {player.strikeRate || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Bowlers */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Award className="w-6 h-6 text-green-500 mr-2" />
                Top Bowlers
              </h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {(filteredBowlers.length > 0 ? filteredBowlers : topBowlers).map((player, index) => (
                <div key={player.name} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <img 
                      src={`/logos/${player.team.toLowerCase()}.${player.team === 'CSK' || player.team === 'RR' ? 'png' : 'jpeg'}`} 
                      alt={player.team} 
                      className="w-8 h-8 rounded object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="text-2xl hidden">{player.avatar}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-600">{player.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{player.wickets}</p>
                    <p className="text-xs text-gray-600">Eco: {player.economy}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team Performance */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Trophy className="w-6 h-6 text-purple-500 mr-2" />
                Points Table
              </h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {teamPerformance.map((team, index) => (
                <div key={team.team} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{team.team}</p>
                      <p className="text-xs text-gray-600">{team.wins}W - {team.losses}L</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{team.points}</p>
                    <p className="text-xs text-gray-600">{team.nrr}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Match Statistics */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Season Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchStats.map((stat, index) => (
              <div key={stat.category} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.category}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.team}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Charts */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Performance Analytics</h2>
            <p className="text-gray-600">Real-time data updates every 30-60 seconds</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <RealTimeLineChart title="Team Wins Trend" dataKey="wins" />
            <RealTimeDonutChart title="Championship Titles" />
            <RealTimeBarChart title="Points Table" />
          </div>
        </motion.div>


      </div>
    </div>
  )
}

export default Analytics