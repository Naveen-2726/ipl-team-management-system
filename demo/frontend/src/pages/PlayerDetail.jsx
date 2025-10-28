import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Trophy, Star, BarChart3 } from 'lucide-react'
import apiService from '../services/apiService'
import EnhancedLoadingScreen from '../components/EnhancedLoadingScreen'

const PlayerDetail = () => {
  const { id } = useParams()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Get updated players from localStorage
  const getUpdatedPlayers = () => {
    const saved = localStorage.getItem('updatedPlayers')
    return saved ? JSON.parse(saved) : {}
  }
  
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true)
        const response = await apiService.getPlayerById(id)
        
        // Apply any updates from localStorage
        const updatedPlayers = getUpdatedPlayers()
        const finalPlayer = updatedPlayers[id] ? { ...response, ...updatedPlayers[id] } : response
        
        setPlayer(finalPlayer)
      } catch (error) {
        console.error('Error fetching player:', error)
        setError('Player not found')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchPlayer()
    }
  }, [id])
  
  if (loading) {
    return <EnhancedLoadingScreen message="Loading player details..." />
  }
  
  if (error || !player) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Player Not Found</h1>
            <p className="text-gray-600">The player you're looking for doesn't exist or hasn't been added yet.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{player.playerName || player.name}</h1>
              <p className="text-xl text-gray-600">{player.team?.teamName || player.teamName || 'Unknown Team'} • {player.role}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Runs</p>
              <p className="text-3xl font-bold text-gray-900">{player.runsScored || player.runs || 0}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Matches</p>
              <p className="text-3xl font-bold text-gray-900">{player.matchesPlayed || player.matches || 0}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Average</p>
              <p className="text-3xl font-bold text-gray-900">{player.battingAverage || player.average || '0.0'}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Strike Rate</p>
              <p className="text-3xl font-bold text-gray-900">{player.strikeRate || '0.0'}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlayerDetail