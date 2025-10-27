import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Trophy, Star, Search, Filter, UserPlus } from 'lucide-react'
import apiService from '../services/apiService'
import { TeamLogo } from '../utils/logoUtils.jsx'

const Squads = () => {
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamPlayers(selectedTeam.id)
    }
  }, [selectedTeam])

  const fetchTeams = async () => {
    try {
      const data = await apiService.getTeams()
      setTeams(data.content || [])
      if (data.content && data.content.length > 0) {
        setSelectedTeam(data.content[0])
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      // Fallback data
      const fallbackTeams = [
        { id: 1, teamName: 'Chennai Super Kings', logoUrl: teamLogos['CSK'] },
        { id: 2, teamName: 'Mumbai Indians', logoUrl: teamLogos['MI'] },
        { id: 3, teamName: 'Royal Challengers Bangalore', logoUrl: teamLogos['RCB'] }
      ]
      setTeams(fallbackTeams)
      setSelectedTeam(fallbackTeams[0])
    } finally {
      setLoading(false)
    }
  }

  const fetchTeamPlayers = async (teamId) => {
    try {
      const data = await apiService.getPlayersByTeam(teamId)
      setPlayers(data.content || [])
    } catch (error) {
      console.error('Error fetching players:', error)
      // Fallback data
      setPlayers([
        { id: 1, playerName: 'MS Dhoni', role: 'Wicket Keeper', age: 42 },
        { id: 2, playerName: 'Ruturaj Gaikwad', role: 'Batsman', age: 27 },
        { id: 3, playerName: 'Ravindra Jadeja', role: 'All Rounder', age: 35 }
      ])
    }
  }

  const filteredPlayers = players.filter(player =>
    player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'batsman': return 'bg-green-100 text-green-800'
      case 'bowler': return 'bg-red-100 text-red-800'
      case 'all rounder': return 'bg-purple-100 text-purple-800'
      case 'wicket keeper': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading squads...</p>
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
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Team Squads</h1>
                <p className="text-xl text-blue-100">Complete team roster management</p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Team Selection Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Team</h2>
              <div className="space-y-3">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeam(team)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedTeam?.id === team.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <TeamLogo teamName={team.teamName} size="w-10 h-10" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 text-sm">{team.teamName}</p>
                        <p className="text-xs text-gray-500">{players.length} players</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Squad Details */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {selectedTeam && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                {/* Team Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <TeamLogo teamName={selectedTeam.teamName} size="w-16 h-16" />
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{selectedTeam.teamName}</h2>
                        <p className="text-gray-600">{filteredPlayers.length} players in squad</p>
                      </div>
                    </div>
                    <Link
                      to={`/teams/${selectedTeam.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                {/* Players Grid */}
                <div className="p-6">
                  {filteredPlayers.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPlayers.map((player, index) => (
                        <motion.div
                          key={player.id}
                          className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(player.role)}`}>
                              {player.role}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{player.playerName}</h3>
                          <p className="text-sm text-gray-600 mb-2">Age: {player.age}</p>
                          <Link
                            to={`/players/${player.id}`}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Profile →
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Players Found</h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm ? 'No players match your search criteria.' : 'This team has no registered players yet.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Squads