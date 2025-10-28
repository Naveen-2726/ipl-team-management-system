import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Plus, Edit, Trash2, Clock, MapPin, Search, Eye, Play } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../../services/apiService'

const AdminMatches = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletedMatchIds, setDeletedMatchIds] = useState(() => {
    const saved = localStorage.getItem('deletedMatchIds')
    return saved ? JSON.parse(saved) : []
  })
  
  // Get updated matches from localStorage
  const getUpdatedMatches = () => {
    const saved = localStorage.getItem('updatedMatches')
    return saved ? JSON.parse(saved) : {}
  }
  
  // Get created matches from localStorage
  const getCreatedMatches = () => {
    const saved = localStorage.getItem('createdMatches')
    return saved ? JSON.parse(saved) : []
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const data = await apiService.getMatches()
      let matchesData = data.content || []
      
      // Filter out deleted matches (for demo mode)
      matchesData = matchesData.filter(match => !deletedMatchIds.includes(match.id))
      
      // Add created matches from localStorage (for demo mode)
      const createdMatches = getCreatedMatches().filter(match => !deletedMatchIds.includes(match.id))
      matchesData = [...matchesData, ...createdMatches]
      
      // Apply updated match data from localStorage (for demo mode)
      const updatedMatches = getUpdatedMatches()
      matchesData = matchesData.map(match => {
        if (updatedMatches[match.id]) {
          return { ...match, ...updatedMatches[match.id] }
        }
        return match
      })
      
      // Sort by date descending to show newest first
      const sortedMatches = matchesData.sort((a, b) => {
        const dateA = new Date(a.date || a.matchDate || 0)
        const dateB = new Date(b.date || b.matchDate || 0)
        return dateB - dateA
      })
      
      setMatches(sortedMatches)
    } catch (error) {
      console.error('Error fetching matches:', error)
      // Show created matches from localStorage as fallback
      const createdMatches = getCreatedMatches().filter(match => !deletedMatchIds.includes(match.id))
      const sortedCreatedMatches = createdMatches.sort((a, b) => {
        const dateA = new Date(a.date || a.matchDate || 0)
        const dateB = new Date(b.date || b.matchDate || 0)
        return dateB - dateA
      })
      setMatches(sortedCreatedMatches)
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = ['All', 'Upcoming', 'Live', 'Completed', 'Cancelled']

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        console.log('Attempting to delete match ID:', id)
        const result = await apiService.deleteMatch(id)
        
        // Add to deleted list and persist
        const newDeletedIds = [...deletedMatchIds, id]
        setDeletedMatchIds(newDeletedIds)
        localStorage.setItem('deletedMatchIds', JSON.stringify(newDeletedIds))
        
        // Remove from local state immediately
        setMatches(prevMatches => prevMatches.filter(match => match.id !== id))
        toast.success('Match deleted')
        
      } catch (error) {
        console.error('Error deleting match:', error)
        toast.error('Failed to delete match')
      }
    }
  }

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || match.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Match Management</h1>
              <p className="text-gray-600 mt-2">Schedule and manage IPL matches</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Link
                to="/admin/matches/add"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Schedule Match</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading matches...</p>
          </div>
        ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Match</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Venue</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Result</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMatches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={`/logos/${match.team1.toLowerCase()}.${match.team1 === 'CSK' || match.team1 === 'RR' ? 'png' : 'jpeg'}`} 
                            alt={match.team1} 
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                          <span className="text-sm font-medium">{match.team1}</span>
                        </div>
                        <span className="text-gray-500 font-bold">VS</span>
                        <div className="flex items-center space-x-2">
                          <img 
                            src={`/logos/${match.team2.toLowerCase()}.${match.team2 === 'CSK' || match.team2 === 'RR' ? 'png' : 'jpeg'}`} 
                            alt={match.team2} 
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                          <span className="text-sm font-medium">{match.team2}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{match.matchType} • Match #{match.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-gray-900">{match.date}</div>
                          <div className="text-sm text-gray-500">{match.time}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{match.venue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        match.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : match.status === 'Live'
                          ? 'bg-red-100 text-red-800'
                          : match.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {match.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {match.result ? (
                        <span className="text-sm text-gray-900">{match.result}</span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/matches/${match.id}`}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          to={`/admin/matches/edit/${match.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Match"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(match.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Match"
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

export default AdminMatches