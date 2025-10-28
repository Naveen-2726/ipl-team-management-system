import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, User, Calendar, FileText, BarChart3 } from 'lucide-react'

const EvaluationDetail = () => {
  const { id } = useParams()
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvaluationDetail()
  }, [id])

  const fetchEvaluationDetail = () => {
    // Get evaluations from localStorage
    const createdEvaluations = JSON.parse(localStorage.getItem('createdEvaluations') || '[]')
    
    // Fallback evaluations
    const fallbackEvaluations = [
      {
        id: 1,
        playerId: 1,
        playerName: 'Virat Kohli',
        team: 'RCB',
        overallRating: 9.2,
        battingRating: 9.5,
        bowlingRating: 6.0,
        fieldingRating: 8.5,
        fitnessRating: 9.0,
        evaluationDate: '2024-01-15',
        evaluatedBy: 'Coach Smith',
        comments: 'Exceptional batting performance, leadership qualities outstanding',
        status: 'completed'
      },
      {
        id: 2,
        playerId: 2,
        playerName: 'Jasprit Bumrah',
        team: 'MI',
        overallRating: 9.0,
        battingRating: 5.5,
        bowlingRating: 9.8,
        fieldingRating: 8.0,
        fitnessRating: 8.8,
        evaluationDate: '2024-01-14',
        evaluatedBy: 'Coach Johnson',
        comments: 'World-class bowling, excellent death bowling specialist',
        status: 'completed'
      },
      {
        id: 3,
        playerId: 3,
        playerName: 'MS Dhoni',
        team: 'CSK',
        overallRating: 8.8,
        battingRating: 8.2,
        bowlingRating: 4.0,
        fieldingRating: 9.5,
        fitnessRating: 8.5,
        evaluationDate: '2024-01-13',
        evaluatedBy: 'Coach Fleming',
        comments: 'Exceptional wicket-keeping, great finishing ability',
        status: 'pending'
      }
    ]

    const allEvaluations = [...fallbackEvaluations, ...createdEvaluations]
    const foundEvaluation = allEvaluations.find(evaluation => evaluation.id.toString() === id)
    
    setEvaluation(foundEvaluation)
    setLoading(false)
  }

  const getRatingColor = (rating) => {
    if (rating >= 9) return 'text-green-600 bg-green-100'
    if (rating >= 7) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading evaluation details...</p>
        </div>
      </div>
    )
  }

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Evaluation Not Found</h2>
          <p className="text-gray-600 mb-4">The evaluation you're looking for doesn't exist.</p>
          <Link
            to="/evaluations"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Evaluations
          </Link>
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
          <Link
            to="/evaluations"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Evaluations
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Evaluation Details</h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{evaluation.playerName}</h2>
                <p className="text-gray-600">{evaluation.team}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(evaluation.status)}`}>
                  {evaluation.status.charAt(0).toUpperCase() + evaluation.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Evaluation Date:</span>
                  <span className="font-medium">{evaluation.evaluationDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Evaluated By:</span>
                  <span className="font-medium">{evaluation.evaluatedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Player ID:</span>
                  <span className="font-medium">#{evaluation.playerId}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ratings */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Performance Ratings
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Overall Rating */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className={`text-4xl font-bold mb-2 ${getRatingColor(evaluation.overallRating).split(' ')[0]}`}>
                    {evaluation.overallRating}
                  </div>
                  <div className="text-gray-600 font-medium">Overall Rating</div>
                </div>

                {/* Individual Ratings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Batting</span>
                    <span className={`px-3 py-1 rounded-full font-bold ${getRatingColor(evaluation.battingRating)}`}>
                      {evaluation.battingRating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Bowling</span>
                    <span className={`px-3 py-1 rounded-full font-bold ${getRatingColor(evaluation.bowlingRating)}`}>
                      {evaluation.bowlingRating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Fielding</span>
                    <span className={`px-3 py-1 rounded-full font-bold ${getRatingColor(evaluation.fieldingRating)}`}>
                      {evaluation.fieldingRating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Fitness</span>
                    <span className={`px-3 py-1 rounded-full font-bold ${getRatingColor(evaluation.fitnessRating)}`}>
                      {evaluation.fitnessRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Evaluation Comments
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 italic">"{evaluation.comments}"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EvaluationDetail