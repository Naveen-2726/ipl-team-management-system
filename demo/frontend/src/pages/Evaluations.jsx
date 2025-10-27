import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FileText, Star, TrendingUp, TrendingDown, Users, 
  Calendar, Filter, Search, Plus, Eye, BarChart3
} from 'lucide-react'
import apiService from '../services/apiService'

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([])
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvaluations()
    fetchPlayers()
  }, [])

  const fetchEvaluations = async () => {
    try {
      const data = await apiService.getEvaluations()
      setEvaluations(data.content || [])
    } catch (error) {
      console.error('Error fetching evaluations:', error)
      // Fallback data
      setEvaluations([
        {
          id: 1,
          playerId: 1,
          playerName: 'Virat Kohli',
          team: 'RCB',
          overallRating: 9.2,
          battingRating: 9.5,
          bowlingRating: 6.0,
          fieldingRating: 8.5,
          fitnessRating: 9.0,
          evaluationDate: '2024-01-15',
          evaluatedBy: 'Coach Smith',
          comments: 'Exceptional batting performance, leadership qualities outstanding',
          status: 'completed'
        },
        {
          id: 2,
          playerId: 2,
          playerName: 'Jasprit Bumrah',
          team: 'MI',
          overallRating: 9.0,
          battingRating: 5.5,
          bowlingRating: 9.8,
          fieldingRating: 8.0,
          fitnessRating: 8.8,
          evaluationDate: '2024-01-14',
          evaluatedBy: 'Coach Johnson',
          comments: 'World-class bowling, excellent death bowling specialist',
          status: 'completed'
        },
        {
          id: 3,
          playerId: 3,
          playerName: 'MS Dhoni',
          team: 'CSK',
          overallRating: 8.8,
          battingRating: 8.2,
          bowlingRating: 4.0,
          fieldingRating: 9.5,
          fitnessRating: 8.5,
          evaluationDate: '2024-01-13',
          evaluatedBy: 'Coach Fleming',
          comments: 'Exceptional wicket-keeping, great finishing ability',
          status: 'pending'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchPlayers = async () => {
    try {
      const data = await apiService.getPlayers()
      setPlayers(data.content || [])
    } catch (error) {
      console.error('Error fetching players:', error)
    }
  }

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.team.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || evaluation.status === filterType
    return matchesSearch && matchesFilter
  })

  const getRatingColor = (rating) => {
    if (rating >= 9) return 'text-green-600'
    if (rating >= 7) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const averageRating = evaluations.length > 0 
    ? (evaluations.reduce((sum, evaluation) => sum + evaluation.overallRating, 0) / evaluations.length).toFixed(1)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading evaluations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Player Evaluations</h1>
                <p className="text-xl text-purple-100">Performance assessment and rating system</p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{evaluations.length}</div>
            <div className="text-gray-600 font-medium">Total Evaluations</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{averageRating}</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{evaluations.filter(e => e.status === 'completed').length}</div>
            <div className="text-gray-600 font-medium">Completed</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{evaluations.filter(e => e.status === 'pending').length}</div>
            <div className="text-gray-600 font-medium">Pending</div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search evaluations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            <Link
              to="/admin/evaluations/add"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Evaluation</span>
            </Link>
          </div>
        </motion.div>

        {/* Evaluations List */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Evaluations</h2>
          </div>
          
          {filteredEvaluations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredEvaluations.map((evaluation, index) => (
                <motion.div
                  key={evaluation.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{evaluation.playerName}</h3>
                        <p className="text-sm text-gray-600">{evaluation.team} • {evaluation.evaluationDate}</p>
                        <p className="text-xs text-gray-500">Evaluated by {evaluation.evaluatedBy}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      {/* Rating Breakdown */}
                      <div className="hidden md:flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500">Overall</p>
                          <p className={`font-bold ${getRatingColor(evaluation.overallRating)}`}>
                            {evaluation.overallRating}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Batting</p>
                          <p className={`font-bold ${getRatingColor(evaluation.battingRating)}`}>
                            {evaluation.battingRating}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Bowling</p>
                          <p className={`font-bold ${getRatingColor(evaluation.bowlingRating)}`}>
                            {evaluation.bowlingRating}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Fielding</p>
                          <p className={`font-bold ${getRatingColor(evaluation.fieldingRating)}`}>
                            {evaluation.fieldingRating}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                          {evaluation.status.charAt(0).toUpperCase() + evaluation.status.slice(1)}
                        </span>
                        <Link
                          to={`/evaluations/${evaluation.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {evaluation.comments && (
                    <div className="mt-4 ml-16">
                      <p className="text-sm text-gray-600 italic">"{evaluation.comments}"</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Evaluations Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'No evaluations match your search criteria.' : 'No player evaluations have been created yet.'}
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create First Evaluation
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Evaluations