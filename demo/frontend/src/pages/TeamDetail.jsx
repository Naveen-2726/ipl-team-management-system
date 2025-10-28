import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Users, MapPin, Calendar, Star, Award } from 'lucide-react'
import { getTeamTitles } from '../data/iplTitles'
import { TeamLogo } from '../utils/logoUtils'
import apiService from '../services/apiService'
import EnhancedLoadingScreen from '../components/EnhancedLoadingScreen'

const TeamDetail = () => {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Get updated teams from localStorage
  const getUpdatedTeams = () => {
    const saved = localStorage.getItem('updatedTeams')
    return saved ? JSON.parse(saved) : {}
  }
  
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true)
        const response = await apiService.getTeamById(id)
        
        // Apply any updates from localStorage
        const updatedTeams = getUpdatedTeams()
        const finalTeam = updatedTeams[id] ? { ...response, ...updatedTeams[id] } : response
        
        // Add additional data for display
        const teamWithExtras = {
          ...finalTeam,
          name: finalTeam.teamName,
          shortName: finalTeam.teamName?.split(' ').map(word => word[0]).join('') || 'TM',
          titles: getTeamTitles(finalTeam.teamName),
          colors: ['#FFFF00', '#0066CC'],
          captain: finalTeam.captain || 'TBD',
          coach: finalTeam.coach || 'TBD',
          homeGround: finalTeam.homeGround || 'TBD',
          founded: finalTeam.foundedYear || 2008
        }
        
        setTeam(teamWithExtras)
      } catch (error) {
        console.error('Error fetching team:', error)
        setError('Team not found')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchTeam()
    }
  }, [id])
  
  if (loading) {
    return <EnhancedLoadingScreen message="Loading team details..." />
  }
  
  if (error || !team) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Not Found</h1>
            <p className="text-gray-600">The team you're looking for doesn't exist or hasn't been added yet.</p>
          </div>
        </div>
      </div>
    )
  }

  const players = [
    { id: 1, name: 'MS Dhoni', role: 'Wicket Keeper', matches: 45, runs: 380 },
    { id: 2, name: 'Ruturaj Gaikwad', role: 'Batsman', matches: 30, runs: 420 },
    { id: 3, name: 'Ravindra Jadeja', role: 'All Rounder', matches: 40, runs: 250 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Team Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div 
            className="rounded-3xl p-8 text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${team.colors[0]} 0%, ${team.colors[1]} 100%)`
            }}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
                <p className="text-xl opacity-90">{team.shortName} • {team.city || 'India'}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>{team.titles} Titles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Founded {team.founded}</span>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20">
                <TeamLogo teamName={team.name} size="w-full h-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Captain</label>
                  <p className="text-lg font-semibold text-gray-900">{team.captain}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Coach</label>
                  <p className="text-lg font-semibold text-gray-900">{team.coach}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Home Ground</label>
                  <p className="text-lg font-semibold text-gray-900">{team.homeGround}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">IPL Titles</label>
                  <p className="text-lg font-semibold text-gray-900">{team.titles}</p>
                </div>
              </div>
            </div>

            {/* Players */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Squad</h2>
              <div className="space-y-4">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{player.runs} runs</p>
                      <p className="text-sm text-gray-600">{player.matches} matches</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Season Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Matches Played</span>
                  <span className="font-semibold">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Wins</span>
                  <span className="font-semibold text-green-600">10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Losses</span>
                  <span className="font-semibold text-red-600">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Points</span>
                  <span className="font-semibold">20</span>
                </div>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Matches</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">CSK vs MI</span>
                    <span className="text-sm text-green-600">Won</span>
                  </div>
                  <p className="text-sm text-gray-600">185/6 vs 178/8</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">RCB vs CSK</span>
                    <span className="text-sm text-red-600">Lost</span>
                  </div>
                  <p className="text-sm text-gray-600">165/9 vs 168/4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamDetail