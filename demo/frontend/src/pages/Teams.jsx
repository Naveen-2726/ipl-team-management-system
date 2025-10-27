import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Trophy, Users, MapPin, Calendar, Star, 
  Search, Filter, ArrowRight, Crown, Award
} from 'lucide-react'
import apiService from '../services/apiService'
import { TeamLogo, getTeamColor, TeamBadge } from '../utils/logoUtils.jsx'
import { usePagination, useSorting } from '../utils/pagination'
import Pagination from '../components/Pagination'
import SearchFilter from '../components/SearchFilter'
import EnhancedLoadingScreen from '../components/EnhancedLoadingScreen'
import { getTeamTitles } from '../data/iplTitles'


const Teams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        console.log('Fetching teams from API...')
        const response = await apiService.getTeams()
        console.log('API response:', response)
        
        // Handle paginated response
        const teamsData = response.content || response.data || response
        if (Array.isArray(teamsData)) {
          console.log('Teams data from API:', teamsData)
          setTeams(teamsData)
        } else {
          console.log('Invalid teams data format:', teamsData)
          setTeams([])
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
        // Only use fallback on error
        const fallbackTeams = [
          { id: 1, teamName: 'Chennai Super Kings', shortName: 'CSK', city: 'Chennai', captain: 'MS Dhoni', coach: 'Stephen Fleming', titlesWon: 5, foundedYear: 2008 },
          { id: 2, teamName: 'Mumbai Indians', shortName: 'MI', city: 'Mumbai', captain: 'Rohit Sharma', coach: 'Mahela Jayawardene', titlesWon: 5, foundedYear: 2008 },
          { id: 3, teamName: 'Royal Challengers Bangalore', shortName: 'RCB', city: 'Bangalore', captain: 'Virat Kohli', coach: 'Mike Hesson', titlesWon: 1, foundedYear: 2008 },
          { id: 4, teamName: 'Kolkata Knight Riders', shortName: 'KKR', city: 'Kolkata', captain: 'Shreyas Iyer', coach: 'Brendon McCullum', titlesWon: 2, foundedYear: 2008 },
          { id: 5, teamName: 'Delhi Capitals', shortName: 'DC', city: 'Delhi', captain: 'Rishabh Pant', coach: 'Ricky Ponting', titlesWon: 0, foundedYear: 2008 },
          { id: 6, teamName: 'Punjab Kings', shortName: 'PBKS', city: 'Mohali', captain: 'Shikhar Dhawan', coach: 'Trevor Bayliss', titlesWon: 0, foundedYear: 2008 },
          { id: 7, teamName: 'Rajasthan Royals', shortName: 'RR', city: 'Jaipur', captain: 'Sanju Samson', coach: 'Kumar Sangakkara', titlesWon: 1, foundedYear: 2008 },
          { id: 8, teamName: 'Sunrisers Hyderabad', shortName: 'SRH', city: 'Hyderabad', captain: 'Aiden Markram', coach: 'Brian Lara', titlesWon: 1, foundedYear: 2013 },
          { id: 9, teamName: 'Gujarat Titans', shortName: 'GT', city: 'Ahmedabad', captain: 'Hardik Pandya', coach: 'Ashish Nehra', titlesWon: 1, foundedYear: 2022 },
          { id: 10, teamName: 'Lucknow Super Giants', shortName: 'LSG', city: 'Lucknow', captain: 'KL Rahul', coach: 'Andy Flower', titlesWon: 0, foundedYear: 2022 }
        ]
        setTeams(fallbackTeams)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  const defaultTeamData = {
    city: 'Unknown',
    founded: 2008,
    captain: 'TBD',
    coach: 'TBD',
    titles: 0,
    players: 25,
    colors: ['#1e40af', '#3b82f6'],
    description: 'IPL Team'
  }

  const getCorrectShortName = (teamName, apiShortName) => {
    const correctShortNames = {
      'Punjab Kings': 'PBKS',
      'Sunrisers Hyderabad': 'SRH',
      'Chennai Super Kings': 'CSK',
      'Mumbai Indians': 'MI',
      'Royal Challengers Bangalore': 'RCB',
      'Kolkata Knight Riders': 'KKR',
      'Delhi Capitals': 'DC',
      'Rajasthan Royals': 'RR',
      'Gujarat Titans': 'GT',
      'Lucknow Super Giants': 'LSG'
    }
    return correctShortNames[teamName] || apiShortName || teamName?.split(' ').map(w => w[0]).join('') || 'IPL'
  }

  const transformedTeams = teams.map((team) => ({
    ...defaultTeamData,
    ...team,
    name: team.teamName || team.name,
    shortName: getCorrectShortName(team.teamName || team.name, team.shortName),
    city: team.city || 'Unknown',
    captain: team.captain || 'TBD',
    coach: team.coach || 'TBD',
    titles: team.titlesWon || getTeamTitles(team.teamName || team.name) || 0,
    founded: team.foundedYear || 2008
  }))

  const filteredTeams = transformedTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const { sortedData, sortConfig, requestSort } = useSorting(filteredTeams)
  const { currentPage, paginatedData, goToPage } = usePagination(sortedData, 8)

  if (loading) {
    return <EnhancedLoadingScreen message="Loading IPL teams..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-primary text-gradient-modern">
            IPL Teams
          </h1>
          <p className="text-body-large max-w-4xl mx-auto">
            Discover all 10 IPL franchises, their players, statistics, and rich history in our comprehensive team management platform
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search teams, cities..."
          />
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Showing {paginatedData.length} of {filteredTeams.length} teams
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
                onClick={() => requestSort('titles')}
                className={`px-3 py-1 rounded-lg text-sm ${sortConfig.field === 'titles' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              >
                Sort by Titles
              </button>
            </div>
          </div>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedData.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/teams/${team.id}`} className="group">
                <div className="card-modern overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
                  {/* Team Header */}
                  <div 
                    className="h-32 p-6 text-white relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${getTeamColor(team.shortName).primary} 0%, ${getTeamColor(team.shortName).secondary} 100%)`
                    }}
                  >
                    <div className="flex items-center justify-between h-full">
                      <div>
                        <h3 className="text-2xl font-bold">{team.shortName}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          {team.titles > 0 && (
                            <div className="flex items-center space-x-1">
                              <Crown className="w-4 h-4 text-yellow-300" />
                              <span className="text-sm">{team.titles}x</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{team.city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12">
                        <TeamLogo 
                          teamName={team.name || team.teamName} 
                          size="w-full h-full" 
                          className="p-1"
                          removeBorder={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Team Info */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {team.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {team.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Captain:</span>
                        <span className="font-medium text-gray-900">{team.captain}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Coach:</span>
                        <span className="font-medium text-gray-900">{team.coach}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Founded:</span>
                        <span className="font-medium text-gray-900">{team.founded}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{team.players}</span>
                        </div>
                        {team.titles > 0 && (
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span>{team.titles}</span>
                          </div>
                        )}
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
        {Math.ceil(filteredTeams.length / 8) > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTeams.length / 8)}
            onPageChange={goToPage}
            totalItems={filteredTeams.length}
            itemsPerPage={8}
          />
        )}

        {/* Stats Section */}
        <motion.div
          className="mt-20 bg-gradient-modern rounded-3xl p-12 text-white shadow-modern"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">IPL at a Glance</h2>
            <p className="text-blue-100">Key statistics from the world's premier T20 league</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10</div>
              <div className="text-blue-200">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-200">Players</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">74</div>
              <div className="text-blue-200">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">16</div>
              <div className="text-blue-200">Seasons</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Teams