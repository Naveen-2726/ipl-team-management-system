import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react'

const MatchDetail = () => {
  const { id } = useParams()
  
  const match = {
    id: 1,
    team1: 'CSK',
    team2: 'MI',
    score1: '185/6',
    score2: '178/8',
    date: '2024-01-15',
    time: '19:30',
    venue: 'Wankhede Stadium',
    status: 'Completed',
    result: 'CSK Won by 7 runs'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {match.team1} vs {match.team2}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{match.date} • {match.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{match.venue}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{match.team1}</h3>
              <p className="text-4xl font-bold text-blue-600">{match.score1}</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{match.team2}</h3>
              <p className="text-4xl font-bold text-orange-600">{match.score2}</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-100 text-green-800 rounded-full">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">{match.result}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MatchDetail