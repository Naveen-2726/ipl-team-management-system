import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, TrendingDown, Medal, Crown, Target } from 'lucide-react'

const PointsTable = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  const teamLogos = {
    'CSK': '/logos/csk.png',
    'MI': '/logos/mi.jpeg',
    'RCB': '/logos/rcb.jpeg',
    'KKR': '/logos/kkr.jpeg',
    'DC': '/logos/dc.jpeg',
    'PBKS': '/logos/pbks.jpeg',
    'RR': '/logos/rr.png',
    'SRH': '/logos/srh.jpeg',
    'GT': '/logos/gt.jpeg',
    'LSG': '/logos/lsg.jpeg'
  }

  useEffect(() => {
    fetchPointsTable()
  }, [])

  const fetchPointsTable = async () => {
    try {
      const response = await fetch('http://localhost:8080/teams')
      const data = await response.json()
      
      // Transform team data into points table format with mock stats
      const pointsData = (data.content || []).map((team, index) => {
        const shortName = team.teamName.split(' ').pop().toUpperCase()
        const matches = 14
        const wins = Math.floor(Math.random() * 10) + 4
        const losses = matches - wins
        const points = wins * 2
        const nrr = (Math.random() * 2 - 1).toFixed(3)
        
        return {
          pos: index + 1,
          id: team.id,
          name: team.teamName,
          shortName: shortName,
          logoUrl: team.logoUrl || teamLogos[shortName],
          matches,
          wins,
          losses,
          points,
          nrr: nrr >= 0 ? `+${nrr}` : nrr
        }
      }).sort((a, b) => b.points - a.points || parseFloat(b.nrr) - parseFloat(a.nrr))
      
      // Update positions after sorting
      pointsData.forEach((team, index) => {
        team.pos = index + 1
      })
      
      setTeams(pointsData)
    } catch (error) {
      console.error('Error fetching points table:', error)
      // Fallback data
      setTeams([
        { pos: 1, name: 'Gujarat Titans', shortName: 'GT', logoUrl: teamLogos['GT'], matches: 14, wins: 10, losses: 4, points: 20, nrr: '+0.809' },
        { pos: 2, name: 'Rajasthan Royals', shortName: 'RR', logoUrl: teamLogos['RR'], matches: 14, wins: 9, losses: 5, points: 18, nrr: '+0.298' },
        { pos: 3, name: 'Lucknow Super Giants', shortName: 'LSG', logoUrl: teamLogos['LSG'], matches: 14, wins: 9, losses: 5, points: 18, nrr: '+0.284' },
        { pos: 4, name: 'Royal Challengers Bangalore', shortName: 'RCB', logoUrl: teamLogos['RCB'], matches: 14, wins: 8, losses: 6, points: 16, nrr: '-0.253' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getPositionIcon = (pos) => {
    if (pos === 1) return <Crown className="w-5 h-5 text-yellow-500" />
    if (pos <= 4) return <Trophy className="w-4 h-4 text-yellow-500" />
    return null
  }

  const getPositionColor = (pos) => {
    if (pos === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
    if (pos <= 4) return 'bg-gradient-to-r from-green-400 to-green-500'
    if (pos <= 6) return 'bg-gradient-to-r from-blue-400 to-blue-500'
    return 'bg-gradient-to-r from-gray-400 to-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading points table...</p>
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
                <h1 className="text-4xl font-bold mb-2">IPL Points Table</h1>
                <p className="text-xl text-blue-100">Current tournament standings and team rankings</p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Qualification Info */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">1st Place - Direct Final</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Top 4 - Playoffs</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Bottom 6 - Eliminated</span>
            </div>
          </div>
        </motion.div>

        {/* Points Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Tournament Standings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Team</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Matches</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Won</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Lost</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Points</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">NRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teams.map((team, index) => (
                  <motion.tr
                    key={team.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getPositionColor(team.pos)}`}>
                          {team.pos}
                        </div>
                        {getPositionIcon(team.pos)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={team.logoUrl || '/logos/ipl logo.png'}
                          alt={team.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.src = '/logos/ipl logo.png'
                          }}
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{team.name}</div>
                          <div className="text-sm text-gray-500">{team.shortName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{team.matches}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-green-600">{team.wins}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-red-600">{team.losses}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-xl text-gray-900">{team.points}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`flex items-center justify-center space-x-1 font-semibold ${
                        team.nrr.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {team.nrr.startsWith('+') ? 
                          <TrendingUp className="w-4 h-4" /> : 
                          <TrendingDown className="w-4 h-4" />
                        }
                        <span>{team.nrr}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Legend */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="font-medium">M:</span>
                <span>Matches Played</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">W:</span>
                <span>Matches Won</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">L:</span>
                <span>Matches Lost</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Pts:</span>
                <span>Points (2 per win)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">NRR:</span>
                <span>Net Run Rate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PointsTable