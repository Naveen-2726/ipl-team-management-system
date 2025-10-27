import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, Search, Filter, Star, Trophy, Target, 
  TrendingUp, Award, Crown, ArrowRight, BarChart3,
  Calendar, MapPin, Zap
} from 'lucide-react'
import apiService from '../services/apiService'
import { getTeamLogo, getTeamColor, TeamLogo } from '../utils/logoUtils.jsx'
import { usePagination, useSorting } from '../utils/pagination'
import Pagination from '../components/Pagination'
import SearchFilter from '../components/SearchFilter'
import EnhancedLoadingScreen from '../components/EnhancedLoadingScreen'


const Players = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedTeam, setSelectedTeam] = useState('All')

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true)
        console.log('Fetching players from API...')
        const response = await apiService.getPlayers()
        console.log('Players API response:', response)
        
        // Handle paginated response
        const playersData = response.content || response.data || response
        if (Array.isArray(playersData) && playersData.length > 0) {
          console.log('Players data from API:', playersData)
          setPlayers(playersData)
        } else {
          console.log('No players in database, using fallback data')
          // Use fallback data since database has no players
          const fallbackPlayers = [
            { id: 1, playerName: 'MS Dhoni', age: 42, nationality: 'India', role: 'Wicket Keeper', team: { teamName: 'CSK' }, jerseyNumber: 7, matchesPlayed: 264, runsScored: 5082, battingAverage: 39.42, strikeRate: 135.92, highestScore: 84 },
            { id: 2, playerName: 'Virat Kohli', age: 35, nationality: 'India', role: 'Batsman', team: { teamName: 'RCB' }, jerseyNumber: 18, matchesPlayed: 237, runsScored: 7263, battingAverage: 36.51, strikeRate: 130.41, highestScore: 113 },
            { id: 3, playerName: 'Rohit Sharma', age: 37, nationality: 'India', role: 'Batsman', team: { teamName: 'MI' }, jerseyNumber: 45, matchesPlayed: 257, runsScored: 6628, battingAverage: 30.34, strikeRate: 130.61, highestScore: 109 },
            { id: 4, playerName: 'Jasprit Bumrah', age: 30, nationality: 'India', role: 'Bowler', team: { teamName: 'MI' }, jerseyNumber: 93, matchesPlayed: 133, runsScored: 70, wicketsTaken: 165, bowlingAverage: 24.43, economyRate: 7.39 },
            { id: 5, playerName: 'Andre Russell', age: 36, nationality: 'West Indies', role: 'All Rounder', team: { teamName: 'KKR' }, jerseyNumber: 12, matchesPlayed: 140, runsScored: 2556, wicketsTaken: 73, battingAverage: 29.03, strikeRate: 179.81 },
            { id: 6, playerName: 'Shikhar Dhawan', age: 38, nationality: 'India', role: 'Batsman', team: { teamName: 'PBKS' }, jerseyNumber: 25, matchesPlayed: 206, runsScored: 6244, battingAverage: 34.84, strikeRate: 126.64, highestScore: 106 },
            { id: 7, playerName: 'Sanju Samson', age: 29, nationality: 'India', role: 'Wicket Keeper', team: { teamName: 'RR' }, jerseyNumber: 9, matchesPlayed: 154, runsScored: 3397, battingAverage: 27.62, strikeRate: 136.32, highestScore: 119 },
            { id: 8, playerName: 'Aiden Markram', age: 30, nationality: 'South Africa', role: 'Batsman', team: { teamName: 'SRH' }, jerseyNumber: 31, matchesPlayed: 80, runsScored: 2194, battingAverage: 32.25, strikeRate: 142.89, highestScore: 83 },
            { id: 9, playerName: 'Hardik Pandya', age: 31, nationality: 'India', role: 'All Rounder', team: { teamName: 'GT' }, jerseyNumber: 33, matchesPlayed: 148, runsScored: 3423, wicketsTaken: 42, battingAverage: 28.86, strikeRate: 143.89 },
            { id: 10, playerName: 'KL Rahul', age: 32, nationality: 'India', role: 'Wicket Keeper', team: { teamName: 'LSG' }, jerseyNumber: 1, matchesPlayed: 132, runsScored: 4683, battingAverage: 45.55, strikeRate: 134.62, highestScore: 132 }
          ]
          setPlayers(fallbackPlayers)
        }
      } catch (error) {
        console.error('Error fetching players:', error)
        // Fallback data on API error
        const fallbackPlayers = [
          { id: 1, playerName: 'MS Dhoni', age: 42, nationality: 'India', role: 'Wicket Keeper', team: { teamName: 'CSK' }, jerseyNumber: 7, matchesPlayed: 264, runsScored: 5082, battingAverage: 39.42, strikeRate: 135.92, highestScore: 84 },
          { id: 2, playerName: 'Virat Kohli', age: 35, nationality: 'India', role: 'Batsman', team: { teamName: 'RCB' }, jerseyNumber: 18, matchesPlayed: 237, runsScored: 7263, battingAverage: 36.51, strikeRate: 130.41, highestScore: 113 },
          { id: 3, playerName: 'Rohit Sharma', age: 37, nationality: 'India', role: 'Batsman', team: { teamName: 'MI' }, jerseyNumber: 45, matchesPlayed: 257, runsScored: 6628, battingAverage: 30.34, strikeRate: 130.61, highestScore: 109 },
          { id: 4, playerName: 'Jasprit Bumrah', age: 30, nationality: 'India', role: 'Bowler', team: { teamName: 'MI' }, jerseyNumber: 93, matchesPlayed: 133, runsScored: 70, wicketsTaken: 165, bowlingAverage: 24.43, economyRate: 7.39 },
          { id: 5, playerName: 'Andre Russell', age: 36, nationality: 'West Indies', role: 'All Rounder', team: { teamName: 'KKR' }, jerseyNumber: 12, matchesPlayed: 140, runsScored: 2556, wicketsTaken: 73, battingAverage: 29.03, strikeRate: 179.81 },
          { id: 6, playerName: 'Shikhar Dhawan', age: 38, nationality: 'India', role: 'Batsman', team: { teamName: 'PBKS' }, jerseyNumber: 25, matchesPlayed: 206, runsScored: 6244, battingAverage: 34.84, strikeRate: 126.64, highestScore: 106 },
          { id: 7, playerName: 'Sanju Samson', age: 29, nationality: 'India', role: 'Wicket Keeper', team: { teamName: 'RR' }, jerseyNumber: 9, matchesPlayed: 154, runsScored: 3397, battingAverage: 27.62, strikeRate: 136.32, highestScore: 119 },
          { id: 8, playerName: 'Aiden Markram', age: 30, nationality: 'South Africa', role: 'Batsman', team: { teamName: 'SRH' }, jerseyNumber: 31, matchesPlayed: 80, runsScored: 2194, battingAverage: 32.25, strikeRate: 142.89, highestScore: 83 },
          { id: 9, playerName: 'Hardik Pandya', age: 31, nationality: 'India', role: 'All Rounder', team: { teamName: 'GT' }, jerseyNumber: 33, matchesPlayed: 148, runsScored: 3423, wicketsTaken: 42, battingAverage: 28.86, strikeRate: 143.89 },
          { id: 10, playerName: 'KL Rahul', age: 32, nationality: 'India', role: 'Wicket Keeper', team: { teamName: 'LSG' }, jerseyNumber: 1, matchesPlayed: 132, runsScored: 4683, battingAverage: 45.55, strikeRate: 134.62, highestScore: 132 }
        ]
        setPlayers(fallbackPlayers)
      } finally {
        setLoading(false)
      }
    }
    fetchPlayers()
  }, [])

  const roles = ['All', 'Batsman', 'Bowler', 'All Rounder', 'Wicket Keeper']
  const teams = ['All', 'CSK', 'MI', 'RCB', 'KKR', 'DC', 'PBKS', 'RR', 'SRH', 'GT', 'LSG']

  const transformedPlayers = players.map((player, index) => ({
    ...player,
    name: player.playerName || player.name,
    team: player.team?.teamName || player.team,
    teamColor: getTeamColor(player.team?.teamName || player.team),
    nationality: player.nationality || 'India',
    runs: player.runsScored || 0,
    matches: player.matchesPlayed || 0,
    average: player.battingAverage || '0.0',
    strikeRate: player.strikeRate || '0.0',
    price: player.priceCrores ? `₹${player.priceCrores} Cr` : 'N/A',
    rating: '0.0',
    isTopPerformer: index < 3
  }))

  const filteredPlayers = transformedPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'All' || player.role === selectedRole
    const matchesTeam = selectedTeam === 'All' || player.team === selectedTeam
    return matchesSearch && matchesRole && matchesTeam
  })

  const { sortedData, sortConfig, requestSort } = useSorting(filteredPlayers)
  const { currentPage, paginatedData, goToPage, hasNext, hasPrev } = usePagination(sortedData, 8)

  const filterOptions = [
    {
      key: 'role',
      options: roles.map(role => ({ value: role, label: role }))
    },
    {
      key: 'team', 
      options: teams.map(team => ({ value: team, label: team }))
    }
  ]

  const activeFilters = { role: selectedRole, team: selectedTeam }

  const handleFilterChange = (key, value) => {
    if (key === 'role') setSelectedRole(value)
    if (key === 'team') setSelectedTeam(value)
  }

  const topPerformers = transformedPlayers.filter(p => p.isTopPerformer).slice(0, 3)

  if (loading) {
    return <EnhancedLoadingScreen message="Loading cricket stars..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <img src="/logos/ipl%20logo.png" alt="IPL" className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            IPL Players
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover cricket's biggest stars and their incredible performances
          </p>
        </motion.div>

        {/* Top Performers Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 mb-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">🌟 Top Performers</h2>
            <p className="text-blue-100">The elite players dominating the IPL</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {topPerformers.map((player, index) => (
              <div key={player.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <TeamLogo teamName={player.team} />
                  <div>
                    <h3 className="text-xl font-bold">{player.name}</h3>
                    <p className="text-blue-200">{player.team} • {player.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-200">Runs</p>
                    <p className="text-2xl font-bold">{player.runs}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Average</p>
                    <p className="text-2xl font-bold">{player.average}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            placeholder="Search players, teams..."
          />
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Showing {paginatedData.length} of {filteredPlayers.length} players
              </div>

            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => requestSort('name')}
                className={`px-3 py-1 rounded-lg text-sm ${sortConfig.field === 'name' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              >
                Sort by Name
              </button>
              <button
                onClick={() => requestSort('runs')}
                className={`px-3 py-1 rounded-lg text-sm ${sortConfig.field === 'runs' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              >
                Sort by Runs
              </button>
            </div>
          </div>
        </motion.div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedData.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/players/${player.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
                  {/* Player Header */}
                  <div className="h-20 p-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between h-full">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{player.team}</h3>
                        <p className="text-sm text-gray-600">{player.role}</p>
                      </div>
                      <TeamLogo teamName={player.team} size="w-10 h-10" />
                    </div>
                    {player.isTopPerformer && (
                      <div className="absolute top-2 right-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {player.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{player.nationality}</span>
                        <span>•</span>
                        <span>{player.age || 'N/A'} years</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">{player.runs}</div>
                        <div className="text-xs text-gray-600">Runs</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">{player.matches}</div>
                        <div className="text-xs text-gray-600">Matches</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-medium text-gray-900">{player.average}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Strike Rate:</span>
                        <span className="font-medium text-gray-900">{player.strikeRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-green-600">{player.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900">{player.rating}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {Math.ceil(filteredPlayers.length / 8) > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPlayers.length / 8)}
            onPageChange={goToPage}
            totalItems={filteredPlayers.length}
            itemsPerPage={8}
          />
        )}

        {/* Stats Section */}
        <motion.div
          className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Player Statistics</h2>
            <p className="text-gray-600">Key numbers from the IPL</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Active Players</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">International Stars</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">₹500+</div>
              <div className="text-gray-600">Crores Total Value</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Players