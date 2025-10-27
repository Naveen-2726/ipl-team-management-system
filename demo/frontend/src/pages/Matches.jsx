import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, Clock, MapPin, Trophy, Users, 
  Filter, Search, ArrowRight, Zap, Target, 
  TrendingUp, Award, Star, Ticket, Cloud, 
  Sun, CloudRain, Wind, Thermometer, Bell
} from 'lucide-react'
import { TeamLogo } from '../utils/logoUtils.jsx'

const Matches = () => {
  const [matches, setMatches] = useState([])
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const mockMatches = [
    {
      id: 1,
      team1: { name: 'CSK', fullName: 'Chennai Super Kings', color: '#FDB900', logo: '🦁' },
      team2: { name: 'MI', fullName: 'Mumbai Indians', color: '#005DA0', logo: '🔵' },
      date: '2024-12-22',
      time: '19:30',
      venue: 'M. A. Chidambaram Stadium, Chennai',
      status: 'Upcoming',
      matchNumber: 'Match 1',
      weather: { condition: 'Sunny', temp: '32°C', icon: '☀️' },
      prediction: { favorite: 'CSK', percentage: 65 },
      ticketsAvailable: true,
      ticketPrice: '₹500 - ₹5000',
      capacity: '50,000'
    },
    {
      id: 2,
      team1: { name: 'RCB', fullName: 'Royal Challengers Bangalore', color: '#FF1744', logo: '👑' },
      team2: { name: 'KKR', fullName: 'Kolkata Knight Riders', color: '#512DA8', logo: '⚔️' },
      date: '2024-12-24',
      time: '15:30',
      venue: 'Eden Gardens, Kolkata',
      status: 'Upcoming',
      matchNumber: 'Match 2',
      weather: { condition: 'Partly Cloudy', temp: '28°C', icon: '⛅' },
      prediction: { favorite: 'RCB', percentage: 58 },
      ticketsAvailable: true,
      ticketPrice: '₹400 - ₹4500',
      capacity: '68,000'
    },
    {
      id: 3,
      team1: { name: 'DC', fullName: 'Delhi Capitals', color: '#17479E', logo: '🏛️' },
      team2: { name: 'PBKS', fullName: 'Punjab Kings', color: '#DD1F2D', logo: '🦁' },
      date: '2024-12-26',
      time: '19:30',
      venue: 'Arun Jaitley Stadium, Delhi',
      status: 'Upcoming',
      matchNumber: 'Match 3',
      weather: { condition: 'Clear', temp: '25°C', icon: '🌤️' },
      prediction: { favorite: 'DC', percentage: 62 },
      ticketsAvailable: false,
      ticketPrice: 'Sold Out',
      capacity: '41,820'
    },
    {
      id: 4,
      team1: { name: 'GT', fullName: 'Gujarat Titans', color: '#1B2951', logo: '🦅' },
      team2: { name: 'LSG', fullName: 'Lucknow Super Giants', color: '#00A8CC', logo: '🦸' },
      date: '2024-12-28',
      time: '15:30',
      venue: 'Narendra Modi Stadium, Ahmedabad',
      status: 'Upcoming',
      matchNumber: 'Match 4',
      weather: { condition: 'Hot', temp: '35°C', icon: '🔥' },
      prediction: { favorite: 'GT', percentage: 70 },
      ticketsAvailable: true,
      ticketPrice: '₹600 - ₹6000',
      capacity: '132,000'
    },
    {
      id: 5,
      team1: { name: 'RR', fullName: 'Rajasthan Royals', color: '#E91E63', logo: '👑' },
      team2: { name: 'SRH', fullName: 'Sunrisers Hyderabad', color: '#FF9800', logo: '☀️' },
      date: '2024-12-30',
      time: '19:30',
      venue: 'Sawai Mansingh Stadium, Jaipur',
      status: 'Upcoming',
      matchNumber: 'Match 5',
      weather: { condition: 'Windy', temp: '30°C', icon: '💨' },
      prediction: { favorite: 'SRH', percentage: 55 },
      ticketsAvailable: true,
      ticketPrice: '₹350 - ₹3500',
      capacity: '30,000'
    },
    {
      id: 6,
      team1: { name: 'MI', fullName: 'Mumbai Indians', color: '#005DA0', logo: '🔵' },
      team2: { name: 'RCB', fullName: 'Royal Challengers Bangalore', color: '#FF1744', logo: '👑' },
      date: '2025-01-02',
      time: '20:00',
      venue: 'Wankhede Stadium, Mumbai',
      status: 'Upcoming',
      matchNumber: 'Match 6',
      weather: { condition: 'Humid', temp: '31°C', icon: '🌊' },
      prediction: { favorite: 'MI', percentage: 68 },
      ticketsAvailable: true,
      ticketPrice: '₹800 - ₹8000',
      capacity: '33,108'
    }
  ]

  const filters = ['All', 'This Week', 'Next Week', 'This Month']

  useEffect(() => {
    setTimeout(() => {
      setMatches(mockMatches)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.team1.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.team2.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.venue.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const nextMatch = matches[0]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Upcoming <span className="text-blue-600">Matches</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get ready for the most exciting cricket matches with predictions, weather updates, and instant booking
          </p>
        </motion.div>

        {/* Next Match Spotlight */}
        {nextMatch && (
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-lg font-bold">NEXT MATCH</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{nextMatch.matchNumber}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-2xl">{nextMatch.weather.icon}</span>
                    <span className="text-sm">{nextMatch.weather.temp}</span>
                  </div>
                  {nextMatch.ticketsAvailable ? (
                    <button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-2 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2">
                      <Ticket className="w-4 h-4" />
                      <span>Book Tickets</span>
                    </button>
                  ) : (
                    <span className="bg-red-500 px-6 py-2 rounded-xl font-bold">Sold Out</span>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <TeamLogo 
                    teamName={nextMatch.team1.name} 
                    size="w-16 h-16" 
                    className="mx-auto mb-3"
                  />
                  <div className="text-4xl mb-3 hidden">{nextMatch.team1.logo}</div>
                  <h3 className="text-2xl font-bold mb-1">{nextMatch.team1.name}</h3>
                  <p className="text-sm opacity-90">{nextMatch.team1.fullName}</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">VS</div>
                  <div className="bg-white/20 rounded-xl p-3 mb-2">
                    <p className="text-sm opacity-90">{nextMatch.date} • {nextMatch.time}</p>
                    <p className="text-xs opacity-75">{nextMatch.venue}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-yellow-300">Prediction: </span>
                    <span className="font-bold">{nextMatch.prediction.favorite} {nextMatch.prediction.percentage}%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <TeamLogo 
                    teamName={nextMatch.team2.name} 
                    size="w-16 h-16" 
                    className="mx-auto mb-3"
                  />
                  <div className="text-4xl mb-3 hidden">{nextMatch.team2.logo}</div>
                  <h3 className="text-2xl font-bold mb-1">{nextMatch.team2.name}</h3>
                  <p className="text-sm opacity-90">{nextMatch.team2.fullName}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams, venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {filters.map(filterOption => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
            <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
              <Bell className="w-4 h-4" />
              <span>Set Reminders</span>
            </button>
            <div className="text-sm text-gray-600">
              {filteredMatches.length} upcoming matches
            </div>
          </div>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-6">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/matches/${match.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                  <div className="p-6">
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">{match.date}</p>
                          <p className="font-semibold text-gray-900">{match.time}</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-2xl">{match.weather.icon}</span>
                          <span className="text-sm font-medium">{match.weather.condition}</span>
                          <span className="text-sm text-gray-600">{match.weather.temp}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {match.matchNumber}
                        </span>
                        {match.ticketsAvailable ? (
                          <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors">
                            <Ticket className="w-3 h-3 inline mr-1" />
                            Available
                          </button>
                        ) : (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
                      <div className="text-center">
                        <TeamLogo 
                          teamName={match.team1.name} 
                          className="mx-auto mb-3"
                        />
                        <div className="text-4xl mb-3 hidden">{match.team1.logo}</div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {match.team1.name}
                        </h3>
                        <p className="text-sm text-gray-600">{match.team1.fullName}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400 mb-3">VS</div>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mb-2">
                          <p className="text-sm font-bold text-gray-900">Match Prediction</p>
                          <p className="text-lg font-bold text-blue-600">{match.prediction.favorite}</p>
                          <p className="text-sm text-gray-600">{match.prediction.percentage}% Win Chance</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <TeamLogo 
                          teamName={match.team2.name} 
                          className="mx-auto mb-3"
                        />
                        <div className="text-4xl mb-3 hidden">{match.team2.logo}</div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {match.team2.name}
                        </h3>
                        <p className="text-sm text-gray-600">{match.team2.fullName}</p>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{match.venue}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>Capacity: {match.capacity}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-600">Ticket Price: </span>
                          <span className="font-semibold text-gray-900">{match.ticketPrice}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                            Set Reminder
                          </button>
                          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Match Features */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🎯 Match Features</h2>
            <p className="text-blue-100">Enhanced match experience with smart features</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Predictions</h3>
              <p className="text-blue-100 text-sm">Advanced analytics and machine learning predictions for every match</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Weather Updates</h3>
              <p className="text-blue-100 text-sm">Real-time weather conditions and forecasts for match venues</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Booking</h3>
              <p className="text-blue-100 text-sm">Instant ticket booking with seat selection and price comparison</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105">
              Explore All Features
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Matches