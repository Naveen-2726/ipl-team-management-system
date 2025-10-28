import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trophy, Plus, Edit, Trash2, Users, MapPin, Search, Filter, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../../services/apiService'
import { TeamLogo } from '../../utils/logoUtils'

const AdminTeams = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletedTeamIds, setDeletedTeamIds] = useState(() => {
    const saved = localStorage.getItem('deletedTeamIds')
    return saved ? JSON.parse(saved) : []
  })
  
  // Get updated teams from localStorage
  const getUpdatedTeams = () => {
    const saved = localStorage.getItem('updatedTeams')
    return saved ? JSON.parse(saved) : {}
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams()
      let teamsData = data.content || []
      
      // Filter out deleted teams (for demo mode)
      teamsData = teamsData.filter(team => !deletedTeamIds.includes(team.id))
      
      // Apply updated team data from localStorage (for demo mode)
      const updatedTeams = getUpdatedTeams()
      teamsData = teamsData.map(team => {
        if (updatedTeams[team.id]) {
          return { ...team, ...updatedTeams[team.id] }
        }
        return team
      })
      
      // Sort by ID ascending for consistent order
      const sortedTeams = teamsData.sort((a, b) => (a.id || 0) - (b.id || 0))
      
      setTeams(sortedTeams)
    } catch (error) {
      console.error('Error fetching teams:', error)
      // Fallback data for admin
      const fallbackTeams = [
        { id: 1, teamName: 'Chennai Super Kings' },
        { id: 2, teamName: 'Mumbai Indians' },
        { id: 3, teamName: 'Royal Challengers Bangalore' },
        { id: 4, teamName: 'Kolkata Knight Riders' },
        { id: 5, teamName: 'Delhi Capitals' },
        { id: 6, teamName: 'Punjab Kings' },
        { id: 7, teamName: 'Rajasthan Royals' },
        { id: 8, teamName: 'Sunrisers Hyderabad' },
        { id: 9, teamName: 'Gujarat Titans' },
        { id: 10, teamName: 'Lucknow Super Giants' }
      ]
      setTeams(fallbackTeams)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        console.log('Deleting team with ID:', id)
        const result = await apiService.deleteTeam(id)
        
        // Add to deleted list and persist
        const newDeletedIds = [...deletedTeamIds, id]
        setDeletedTeamIds(newDeletedIds)
        localStorage.setItem('deletedTeamIds', JSON.stringify(newDeletedIds))
        
        // Remove from local state immediately
        setTeams(prevTeams => prevTeams.filter(team => team.id !== id))
        toast.success('Team deleted')
        
      } catch (error) {
        console.error('Error deleting team:', error)
        toast.error('Failed to delete team')
      }
    }
  }

  const filteredTeams = teams.filter(team => 
    team.teamName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-2">Manage all IPL franchises and their details</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Link
                to="/admin/teams/add"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Team</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teams...</p>
          </div>
        ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Team</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">City</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Players</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <TeamLogo 
                          teamName={team.teamName} 
                          size="w-10 h-10" 
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{team.teamName}</div>
                          <div className="text-sm text-gray-500">IPL Team</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">India</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">25</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/teams/${team.id}`}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/teams/edit/${team.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Team"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(team.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Team"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default AdminTeams