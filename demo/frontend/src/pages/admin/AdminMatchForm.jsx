import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../../services/apiService'

const AdminMatchForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    team1Id: '',
    team2Id: '',
    matchDate: '',
    venue: ''
  })
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [teamsLoading, setTeamsLoading] = useState(true)
  
  // Get updated matches from localStorage
  const getUpdatedMatches = () => {
    const saved = localStorage.getItem('updatedMatches')
    return saved ? JSON.parse(saved) : {}
  }
  
  // Save updated match to localStorage
  const saveUpdatedMatch = (matchId, matchData) => {
    const updatedMatches = getUpdatedMatches()
    updatedMatches[matchId] = matchData
    localStorage.setItem('updatedMatches', JSON.stringify(updatedMatches))
  }

  useEffect(() => {
    fetchTeams()
    if (isEdit) {
      fetchMatch()
    }
  }, [isEdit, id])
  
  const fetchMatch = async () => {
    try {
      const match = await apiService.getMatchById(id)
      setFormData({
        team1Id: match.team1Id?.toString() || '',
        team2Id: match.team2Id?.toString() || '',
        matchDate: match.matchDate || '',
        venue: match.venue || ''
      })
    } catch (error) {
      console.error('Error fetching match:', error)
      toast.error('Failed to load match data')
      navigate('/admin/matches')
    }
  }

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams()
      setTeams(data.content || [])
    } catch (error) {
      console.error('Error fetching teams:', error)
      setTeams([
        { id: 1, teamName: 'Chennai Super Kings' },
        { id: 2, teamName: 'Mumbai Indians' },
        { id: 3, teamName: 'Royal Challengers Bangalore' }
      ])
    } finally {
      setTeamsLoading(false)
    }
  }

  const venues = [
    'M. A. Chidambaram Stadium, Chennai',
    'Wankhede Stadium, Mumbai',
    'Eden Gardens, Kolkata',
    'Feroz Shah Kotla, Delhi',
    'Sawai Mansingh Stadium, Jaipur',
    'Punjab Cricket Association Stadium, Mohali',
    'Rajiv Gandhi International Stadium, Hyderabad',
    'M. Chinnaswamy Stadium, Bangalore',
    'Narendra Modi Stadium, Ahmedabad',
    'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.team1Id === formData.team2Id) {
      toast.error('Please select different teams')
      return
    }
    
    setLoading(true)
    
    try {
      const matchData = {
        team1Id: parseInt(formData.team1Id),
        team2Id: parseInt(formData.team2Id),
        matchDate: formData.matchDate,
        venue: formData.venue,
        status: 'Scheduled'
      }
      
      let result
      if (isEdit) {
        console.log('Updating match ID:', id)
        result = await apiService.updateMatch(id, matchData)
        
        // Save updated match data locally for demo mode
        if (result.message && result.message.includes('simulated')) {
          saveUpdatedMatch(id, matchData)
        }
        
        toast.success('Match updated')
      } else {
        console.log('Creating match with data:', matchData)
        result = await apiService.createMatch(matchData)
        
        // Save created match locally for demo mode
        const createdMatches = JSON.parse(localStorage.getItem('createdMatches') || '[]')
        const newMatch = {
          id: result.id || Date.now(),
          team1: teams.find(t => t.id.toString() === formData.team1Id)?.teamName || 'Team 1',
          team2: teams.find(t => t.id.toString() === formData.team2Id)?.teamName || 'Team 2',
          date: formData.matchDate.split('T')[0],
          time: formData.matchDate.split('T')[1],
          venue: formData.venue,
          status: 'Upcoming',
          matchDate: formData.matchDate,
          matchType: 'League'
        }
        createdMatches.push(newMatch)
        localStorage.setItem('createdMatches', JSON.stringify(createdMatches))
        console.log('Match saved:', newMatch)
        
        toast.success('Match scheduled successfully!')
      }
      
      navigate('/admin/matches')
    } catch (error) {
      console.error('Error creating match:', error)
      console.error('Error details:', error.response?.data)
      
      // If API fails, simulate success for demo
      if (error.response?.status === 403 || error.response?.status === 404 || error.code === 'ECONNREFUSED') {
        console.log('API unavailable, simulating match creation')
        
        // Save match locally when API fails
        const createdMatches = JSON.parse(localStorage.getItem('createdMatches') || '[]')
        const newMatch = {
          id: Date.now(),
          team1: teams.find(t => t.id.toString() === formData.team1Id)?.teamName || 'Team 1',
          team2: teams.find(t => t.id.toString() === formData.team2Id)?.teamName || 'Team 2',
          date: formData.matchDate.split('T')[0],
          time: formData.matchDate.split('T')[1],
          venue: formData.venue,
          status: 'Upcoming',
          matchDate: formData.matchDate,
          matchType: 'League'
        }
        createdMatches.push(newMatch)
        localStorage.setItem('createdMatches', JSON.stringify(createdMatches))
        console.log('Match saved (demo mode):', newMatch)
        
        toast.success('Match scheduled successfully! (Demo mode)')
        navigate('/admin/matches')
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to schedule match'
        toast.error(errorMsg)
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
                <Calendar className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Match' : 'Schedule Match'}</h1>
              </div>
              <button
                onClick={() => navigate('/admin/matches')}
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
                    Team 1 *
                  </label>
                  {teamsLoading ? (
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                      <span className="text-gray-500">Loading teams...</span>
                    </div>
                  ) : (
                    <select
                      name="team1Id"
                      value={formData.team1Id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Team 1...</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.teamName}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team 2 *
                  </label>
                  {teamsLoading ? (
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                      <span className="text-gray-500">Loading teams...</span>
                    </div>
                  ) : (
                    <select
                      name="team2Id"
                      value={formData.team2Id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Team 2...</option>
                      {teams.filter(team => team.id.toString() !== formData.team1Id).map(team => (
                        <option key={team.id} value={team.id}>{team.teamName}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Match Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="matchDate"
                    value={formData.matchDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue *
                </label>
                <select
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Venue</option>
                  {venues.map(venue => (
                    <option key={venue} value={venue}>{venue}</option>
                  ))}
                </select>
              </div>

              {formData.team1Id && formData.team2Id && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Match Preview</h3>
                  <p className="text-blue-800">
                    {teams.find(t => t.id.toString() === formData.team1Id)?.teamName} vs {teams.find(t => t.id.toString() === formData.team2Id)?.teamName}
                    {formData.matchDate && ` on ${new Date(formData.matchDate).toLocaleDateString()}`}
                    {formData.venue && ` - ${formData.venue}`}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/admin/matches')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || teamsLoading}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? (isEdit ? 'Updating...' : 'Scheduling...') : (isEdit ? 'Update Match' : 'Schedule Match')}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminMatchForm