import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { 
  Trophy, Users, Calendar, BarChart3, TrendingUp, 
  Star, Award, Target, Zap, ArrowRight, Play
} from 'lucide-react'
import apiService from '../services/apiService'
import { TeamLogo, TeamBadge } from '../utils/logoUtils'
import EnhancedLoadingScreen from '../components/EnhancedLoadingScreen'


const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    teams: 0,
    players: 0,
    totalRuns: 0,
    totalWickets: 0
  })
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [teamsResponse, playersResponse] = await Promise.all([
        apiService.getTeams(0, 100),
        apiService.getPlayers(0, 500)
      ])
      
      const teamsData = teamsResponse.content || teamsResponse.data || teamsResponse || []
      const playersData = playersResponse.content || playersResponse.data || playersResponse || []
      
      setTeams(Array.isArray(teamsData) ? teamsData : [])
      setPlayers(Array.isArray(playersData) ? playersData : [])
      
      const totalRuns = playersData.reduce((sum, p) => sum + (p.runsScored || p.runs || 0), 0)
      const totalWickets = playersData.reduce((sum, p) => sum + (p.wicketsTaken || p.wickets || 0), 0)
      
      setStats({
        teams: teamsData.length || 0,
        players: playersData.length || 0,
        totalRuns,
        totalWickets
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to default values
      setStats({
        teams: 10,
        players: 0,
        totalRuns: 0,
        totalWickets: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    { 
      label: 'Total Teams', 
      value: stats.teams.toString(), 
      icon: Trophy, 
      color: 'from-blue-500 to-blue-600',
      change: '+0%',
      trend: 'stable'
    },
    { 
      label: 'Active Players', 
      value: stats.players.toString(), 
      icon: Users, 
      color: 'from-green-500 to-green-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Total Runs', 
      value: stats.totalRuns.toLocaleString(), 
      icon: Target, 
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
      trend: 'up'
    },
    { 
      label: 'Total Wickets', 
      value: stats.totalWickets.toString(), 
      icon: Award, 
      color: 'from-orange-500 to-orange-600',
      change: '+8%',
      trend: 'up'
    }
  ]

  const quickActions = [
    {
      title: 'View Teams',
      description: 'Explore all IPL franchises',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      link: '/teams'
    },
    {
      title: 'Player Stats',
      description: 'Analyze player performance',
      icon: Users,
      color: 'from-green-500 to-green-600',
      link: '/players'
    },
    {
      title: 'Match Center',
      description: 'View matches and results',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      link: '/matches'
    },
    {
      title: 'Analytics Hub',
      description: 'Deep insights and reports',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      link: '/analytics'
    }
  ]

  const recentMatches = [
    {
      id: 1,
      team1: 'CSK',
      team2: 'MI',
      score1: '208/5',
      score2: '192/8',
      status: 'CSK Won',
      date: '2025-03-22'
    },
    {
      id: 2,
      team1: 'RCB',
      team2: 'KKR',
      score1: '185/7',
      score2: '189/4',
      status: 'KKR Won',
      date: '2025-03-23'
    },
    {
      id: 3,
      team1: 'DC',
      team2: 'PBKS',
      score1: '195/6',
      score2: '178/9',
      status: 'DC Won',
      date: '2025-03-24'
    }
  ]

  const topPerformers = players
    .sort((a, b) => (b.runsScored || b.runs || 0) - (a.runsScored || a.runs || 0))
    .slice(0, 5)
    .map(player => {
      const team = teams.find(t => t.id === player.teamId || t.teamName === player.teamName)
      return {
        name: player.playerName || player.name,
        team: team?.shortName || team?.teamName?.substring(0, 3) || 'N/A',
        runs: (player.runsScored || player.runs || 0).toLocaleString(),
        average: (player.battingAverage || player.average || 0).toFixed(1)
      }
    })

  if (loading) {
    return <EnhancedLoadingScreen message="Loading your dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {user?.username}! 👋
                </h1>
                <p className="text-xl text-blue-100">
                  Ready to dive into the IPL action?
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.title}
                    to={action.link}
                    className="group"
                  >
                    <motion.div
                      className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="space-y-4">
                {topPerformers.length > 0 ? topPerformers.map((player, index) => (
                  <div key={player.name} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{player.runs}</p>
                      <p className="text-sm text-gray-600">Avg: {player.average}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No players added yet</p>
                    <p className="text-sm">Admin can add players to see them here</p>
                  </div>
                )}
              </div>
              <Link
                to="/players"
                className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Players →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recent Matches */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Matches</h2>
              <Link
                to="/matches"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {recentMatches.map((match) => (
                <div key={match.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{match.team1}</span>
                      <span className="text-gray-500">vs</span>
                      <span className="font-bold text-lg">{match.team2}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {match.team1}: {match.score1} | {match.team2}: {match.score2}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">{match.status}</span>
                    <span className="text-xs text-gray-500">{match.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard