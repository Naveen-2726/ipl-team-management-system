import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Star, User, Calendar, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../../services/apiService'

const AdminEvaluationForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  
  const [formData, setFormData] = useState({
    playerId: '',
    evaluationDate: new Date().toISOString().split('T')[0],
    overallRating: 5,
    battingRating: 5,
    bowlingRating: 5,
    fieldingRating: 5,
    fitnessRating: 5,
    comments: '',
    evaluatedBy: 'Admin',
    status: 'completed'
  })

  useEffect(() => {
    fetchPlayers()
    fetchTeams()
  }, [])

  const fetchPlayers = async () => {
    try {
      const data = await apiService.getPlayers()
      setPlayers(data.content || [])
    } catch (error) {
      console.error('Error fetching players:', error)
      // Fallback data
      setPlayers([
        { id: 1, playerName: 'Virat Kohli', teamId: 3, role: 'Batsman' },
        { id: 2, playerName: 'MS Dhoni', teamId: 1, role: 'Wicket Keeper' },
        { id: 3, playerName: 'Jasprit Bumrah', teamId: 2, role: 'Bowler' }
      ])
    }
  }

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams()
      setTeams(data.content || [])
    } catch (error) {
      console.error('Error fetching teams:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiService.createEvaluation(formData)
      toast.success('Evaluation created successfully!')
      navigate('/evaluations')
    } catch (error) {
      console.error('Error creating evaluation:', error)
      toast.error('Failed to create evaluation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedPlayer = players.find(p => p.id === parseInt(formData.playerId))
  const selectedTeam = teams.find(t => t.id === selectedPlayer?.teamId)

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600'
    if (rating >= 6) return 'text-yellow-600'
    return 'text-red-600'
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
          <button
            onClick={() => navigate('/evaluations')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Evaluations</span>
          </button>
          
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Create Player Evaluation</h1>
                <p className="text-xl text-purple-100">Assess player performance and skills</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Player Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Player *
                    </label>
                    <select
                      name="playerId"
                      value={formData.playerId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Choose a player...</option>
                      {players.map(player => (
                        <option key={player.id} value={player.id}>
                          {player.playerName} - {player.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluation Date *
                    </label>
                    <input
                      type="date"
                      name="evaluationDate"
                      value={formData.evaluationDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Rating Sections */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Performance Ratings</h3>
                  
                  {/* Overall Rating */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-lg font-semibold text-gray-900">
                        Overall Rating
                      </label>
                      <span className={`text-2xl font-bold ${getRatingColor(formData.overallRating)}`}>
                        {formData.overallRating}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formData.overallRating}
                      onChange={(e) => handleRatingChange('overallRating', e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Poor</span>
                      <span>Average</span>
                      <span>Excellent</span>
                    </div>
                  </div>

                  {/* Individual Ratings */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { key: 'battingRating', label: 'Batting' },
                      { key: 'bowlingRating', label: 'Bowling' },
                      { key: 'fieldingRating', label: 'Fielding' },
                      { key: 'fitnessRating', label: 'Fitness' }
                    ].map(({ key, label }) => (
                      <div key={key} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <label className="font-semibold text-gray-900">{label}</label>
                          <span className={`font-bold ${getRatingColor(formData[key])}`}>
                            {formData[key]}/10
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={formData[key]}
                          onChange={(e) => handleRatingChange(key, e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evaluation Comments
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Provide detailed feedback on player performance..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Additional Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluated By
                    </label>
                    <input
                      type="text"
                      name="evaluatedBy"
                      value={formData.evaluatedBy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/evaluations')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? 'Creating...' : 'Create Evaluation'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Selected Player Info */}
            {selectedPlayer && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Player Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedPlayer.playerName}</p>
                      <p className="text-sm text-gray-600">{selectedPlayer.role}</p>
                    </div>
                  </div>
                  {selectedTeam && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Team</p>
                      <p className="font-semibold text-gray-900">{selectedTeam.teamName}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rating Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rating Guide</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">9-10</span>
                  <span className="text-sm font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">7-8</span>
                  <span className="text-sm font-medium text-blue-600">Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">5-6</span>
                  <span className="text-sm font-medium text-yellow-600">Average</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">3-4</span>
                  <span className="text-sm font-medium text-orange-600">Below Average</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">0-2</span>
                  <span className="text-sm font-medium text-red-600">Poor</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminEvaluationForm