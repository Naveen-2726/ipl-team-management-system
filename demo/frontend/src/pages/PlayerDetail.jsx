import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Trophy, Star, BarChart3 } from 'lucide-react'

const PlayerDetail = () => {
  const { id } = useParams()
  
  const player = {
    id: 1,
    name: 'Virat Kohli',
    team: 'RCB',
    role: 'Batsman',
    runs: 450,
    matches: 45,
    average: 45.0,
    strikeRate: 130.5
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
              <h1 className="text-4xl font-bold text-gray-900">{player.name}</h1>
              <p className="text-xl text-gray-600">{player.team} • {player.role}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Runs</p>
              <p className="text-3xl font-bold text-gray-900">{player.runs}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Matches</p>
              <p className="text-3xl font-bold text-gray-900">{player.matches}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Average</p>
              <p className="text-3xl font-bold text-gray-900">{player.average}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Strike Rate</p>
              <p className="text-3xl font-bold text-gray-900">{player.strikeRate}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlayerDetail