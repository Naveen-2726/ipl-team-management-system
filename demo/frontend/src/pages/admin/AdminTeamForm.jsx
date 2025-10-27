import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trophy, Save, ArrowLeft, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../../services/apiService'

const AdminTeamForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    teamName: '',
    captain: '',
    city: '',
    coach: '',
    foundedYear: 2024,
    homeGround: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const teamData = {
        teamName: formData.teamName.trim()
      }
      
      console.log('Creating team with data:', teamData)
      
      const result = await apiService.createTeam(teamData)
      
      console.log('Team created successfully:', result)
      toast.success('Team created successfully!')
      navigate('/admin/teams')
    } catch (error) {
      console.error('Error creating team:', error)
      console.error('Error response:', error.response?.data)
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          error.message || 
                          'Failed to create team. Please try again.'
      
      toast.error(errorMessage)
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
                <Trophy className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Add New Team</h1>
              </div>
              <button
                onClick={() => navigate('/admin/teams')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mumbai Indians"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Captain
                  </label>
                  <input
                    type="text"
                    name="captain"
                    value={formData.captain}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Rohit Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Mumbai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coach
                  </label>
                  <input
                    type="text"
                    name="coach"
                    value={formData.coach}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Mahela Jayawardene"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Founded Year
                  </label>
                  <input
                    type="number"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="2008"
                    max="2024"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Ground
                </label>
                <input
                  type="text"
                  name="homeGround"
                  value={formData.homeGround}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Wankhede Stadium"
                />
              </div>



              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/admin/teams')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Creating...' : 'Create Team'}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminTeamForm