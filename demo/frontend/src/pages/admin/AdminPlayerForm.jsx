import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Users, Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../../services/apiService'

const AdminPlayerForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    playerName: '',
    age: '',
    role: 'Batsman',
    teamId: '',
    runsScored: '',
    wicketsTaken: '',
    priceCrores: '',
    strikeRate: ''
  })
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [teamsLoading, setTeamsLoading] = useState(true)
  const [playerLoading, setPlayerLoading] = useState(isEdit)
  
  // Get updated players from localStorage
  const getUpdatedPlayers = () => {
    const saved = localStorage.getItem('updatedPlayers')
    return saved ? JSON.parse(saved) : {}
  }
  
  // Save updated player to localStorage
  const saveUpdatedPlayer = (playerId, playerData) => {
    const updatedPlayers = getUpdatedPlayers()
    updatedPlayers[playerId] = playerData
    localStorage.setItem('updatedPlayers', JSON.stringify(updatedPlayers))
  }

  useEffect(() => {
    fetchTeams()
    if (isEdit) {
      fetchPlayer()
    }
  }, [isEdit, id])
  
  const fetchPlayer = async () => {
    try {
      setPlayerLoading(true)
      const player = await apiService.getPlayerById(id)
      setFormData({
        playerName: player.playerName || player.name || '',
        age: player.age?.toString() || '',
        role: player.role || 'Batsman',
        teamId: player.teamId?.toString() || player.team?.id?.toString() || '',
        runsScored: player.runsScored?.toString() || '',
        wicketsTaken: player.wicketsTaken?.toString() || '',
        priceCrores: player.priceCrores?.toString() || '',
        strikeRate: player.strikeRate?.toString() || ''
      })
    } catch (error) {
      console.error('Error fetching player:', error)
      toast.error('Failed to load player data')
      navigate('/admin/players')
    } finally {
      setPlayerLoading(false)
    }
  }

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams()
      const teamsList = data.content || []
      setTeams(teamsList)
      
      // Set first team as default if available
      if (teamsList.length > 0 && !formData.teamId) {
        setFormData(prev => ({ ...prev, teamId: teamsList[0].id.toString() }))
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      // Fallback teams data
      const fallbackTeams = [
        { id: 1, teamName: 'Chennai Super Kings' },
        { id: 2, teamName: 'Mumbai Indians' },
        { id: 3, teamName: 'Royal Challengers Bangalore' },
        { id: 4, teamName: 'Kolkata Knight Riders' },
        { id: 5, teamName: 'Delhi Capitals' }
      ]
      setTeams(fallbackTeams)
      setFormData(prev => ({ ...prev, teamId: '1' }))
    } finally {
      setTeamsLoading(false)
    }
  }

  const roles = ['Batsman', 'Bowler', 'All Rounder', 'Wicket Keeper']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const playerData = {
        playerName: formData.playerName.trim(),
        role: formData.role,
        age: parseInt(formData.age),
        teamId: parseInt(formData.teamId),
        runsScored: formData.runsScored ? parseInt(formData.runsScored) : 0,
        wicketsTaken: formData.wicketsTaken ? parseInt(formData.wicketsTaken) : 0,
        priceCrores: formData.priceCrores ? parseFloat(formData.priceCrores) : 0,
        strikeRate: formData.strikeRate ? parseFloat(formData.strikeRate) : 0
      }
      
      console.log('Sending player data:', playerData)
      
      let result
      if (isEdit) {
        console.log('Updating player ID:', id)
        result = await apiService.updatePlayer(id, playerData)
        
        // Save updated player data locally for demo mode
        if (result.message && result.message.includes('simulated')) {
          saveUpdatedPlayer(id, playerData)
        }
      } else {
        console.log('Creating new player')
        result = await apiService.createPlayer(playerData)
      }
      console.log('Player created successfully:', result)
      console.log('Full response:', result)
      console.log('Response type:', typeof result)
      console.log('Response keys:', Object.keys(result || {}))
      
      // Check if player was actually saved
      if (result && (result.id || result.playerId || result.success !== false)) {
        toast.success(`Player ${playerData.playerName} ${isEdit ? 'updated' : 'added'} successfully!`)
        
        // Verify by fetching players to see if it's there
        try {
          console.log('Verifying player was saved...')
          const playersResponse = await apiService.getPlayers(0, 5)
          console.log('Latest players after creation:', playersResponse)
          
          const players = playersResponse.content || playersResponse.data || playersResponse || []
          const foundPlayer = players.find(p => 
            (p.playerName || p.name) === playerData.playerName
          )
          
          if (foundPlayer) {
            console.log('✅ Player verified in database:', foundPlayer)
          } else {
            console.warn('⚠️ Player not found in latest fetch - might not be saved')
          }
        } catch (verifyError) {
          console.error('Error verifying player:', verifyError)
        }
        
        // Wait a moment before navigating
        setTimeout(() => {
          navigate('/admin/players')
        }, 1500)
      } else {
        console.error('Invalid response from server:', result)
        toast.error('Player creation response was invalid. Please check if it was actually saved.')
      }
      
    } catch (error) {
      console.error('Error adding player:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error status:', error.response?.status)
      console.error('Error message:', error.message)
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        toast.error('Backend server is not running! Please start the backend server.')
      } else {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data || 
                            error.message || 
                            'Failed to add player. Please try again.'
        
        toast.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-green-600" />
                <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Player' : 'Add New Player'}</h1>
              </div>
              <button
                onClick={() => navigate('/admin/players')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Player Name
                  </label>
                  <input
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Virat Kohli"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 35"
                    min="10"
                    max="60"
                    required
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team *
                  </label>
                  {teamsLoading ? (
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                      <span className="text-gray-500">Loading teams...</span>
                    </div>
                  ) : (
                    <select
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a team...</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.teamName}
                        </option>
                      ))}
                    </select>
                  )}
                  {teams.length === 0 && !teamsLoading && (
                    <p className="text-sm text-red-600 mt-1">No teams available. Please add teams first.</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Runs Scored
                  </label>
                  <input
                    type="number"
                    name="runsScored"
                    value={formData.runsScored}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 450"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wickets Taken
                  </label>
                  <input
                    type="number"
                    name="wicketsTaken"
                    value={formData.wicketsTaken}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 15"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strike Rate
                  </label>
                  <input
                    type="number"
                    name="strikeRate"
                    value={formData.strikeRate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 135.5"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (Crores)
                  </label>
                  <input
                    type="number"
                    name="priceCrores"
                    value={formData.priceCrores}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 15.25"
                    min="0"
                    step="0.25"
                  />
                </div>
              </div>



              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/admin/players')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Player' : 'Add Player')}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminPlayerForm