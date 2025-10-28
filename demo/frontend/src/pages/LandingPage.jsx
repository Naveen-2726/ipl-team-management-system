import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Users, Calendar, Play, Star, ArrowRight, BarChart3, Zap, Target, Activity, Shield, Award } from 'lucide-react'
import { TeamLogo } from '../utils/logoUtils'
import { AnimatedPieChart, AnimatedBarChart, AnimatedProgressRing } from '../components/AnimatedCharts'
import { AnimatedCounter } from '../components/AnimatedCounters'
import { motion } from 'framer-motion'
import apiService from '../services/apiService'

const LandingPage = () => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videos = ['/video/csk.mp4', '/video/mi.mp4']


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await apiService.getTeams(0, 100)
        const teamsData = response.content || response.data || response
        if (Array.isArray(teamsData) && teamsData.length > 0) {
          const teamsWithShortNames = teamsData.map(team => ({
            ...team,
            shortName: team.shortName || getTeamShortName(team.teamName)
          }))
          setTeams(teamsWithShortNames)
        } else {
          // Use fallback teams if no teams in database
          const fallbackTeams = [
            { id: 1, teamName: 'Chennai Super Kings', shortName: 'CSK', titles: 5, founded: 2008 },
            { id: 2, teamName: 'Mumbai Indians', shortName: 'MI', titles: 5, founded: 2008 },
            { id: 3, teamName: 'Royal Challengers Bangalore', shortName: 'RCB', titles: 0, founded: 2008 },
            { id: 4, teamName: 'Kolkata Knight Riders', shortName: 'KKR', titles: 2, founded: 2008 },
            { id: 5, teamName: 'Delhi Capitals', shortName: 'DC', titles: 0, founded: 2008 },
            { id: 6, teamName: 'Punjab Kings', shortName: 'PBKS', titles: 0, founded: 2008 },
            { id: 7, teamName: 'Rajasthan Royals', shortName: 'RR', titles: 1, founded: 2008 },
            { id: 8, teamName: 'Sunrisers Hyderabad', shortName: 'SRH', titles: 1, founded: 2013 },
            { id: 9, teamName: 'Gujarat Titans', shortName: 'GT', titles: 1, founded: 2022 },
            { id: 10, teamName: 'Lucknow Super Giants', shortName: 'LSG', titles: 0, founded: 2022 }
          ]
          setTeams(fallbackTeams)
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
        // Use fallback teams on error
        const fallbackTeams = [
          { id: 1, teamName: 'Chennai Super Kings', shortName: 'CSK', titles: 5, founded: 2008 },
          { id: 2, teamName: 'Mumbai Indians', shortName: 'MI', titles: 5, founded: 2008 },
          { id: 3, teamName: 'Royal Challengers Bangalore', shortName: 'RCB', titles: 0, founded: 2008 },
          { id: 4, teamName: 'Kolkata Knight Riders', shortName: 'KKR', titles: 2, founded: 2008 },
          { id: 5, teamName: 'Delhi Capitals', shortName: 'DC', titles: 0, founded: 2008 },
          { id: 6, teamName: 'Punjab Kings', shortName: 'PBKS', titles: 0, founded: 2008 },
          { id: 7, teamName: 'Rajasthan Royals', shortName: 'RR', titles: 1, founded: 2008 },
          { id: 8, teamName: 'Sunrisers Hyderabad', shortName: 'SRH', titles: 1, founded: 2013 },
          { id: 9, teamName: 'Gujarat Titans', shortName: 'GT', titles: 1, founded: 2022 },
          { id: 10, teamName: 'Lucknow Super Giants', shortName: 'LSG', titles: 0, founded: 2022 }
        ]
        setTeams(fallbackTeams)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  const getTeamShortName = (teamName) => {
    const shortNameMap = {
      'Chennai Super Kings': 'CSK',
      'Mumbai Indians': 'MI',
      'Royal Challengers Bangalore': 'RCB',
      'Kolkata Knight Riders': 'KKR',
      'Delhi Capitals': 'DC',
      'Punjab Kings': 'PBKS',
      'Rajasthan Royals': 'RR',
      'Sunrisers Hyderabad': 'SRH',
      'Gujarat Titans': 'GT',
      'Lucknow Super Giants': 'LSG'
    }
    return shortNameMap[teamName] || teamName?.split(' ').map(w => w[0]).join('') || 'IPL'
  }

  const getTeamColor = (shortName) => {
    const colors = {
      'CSK': 'bg-yellow-500',
      'MI': 'bg-blue-600',
      'RCB': 'bg-red-600',
      'KKR': 'bg-purple-700',
      'DC': 'bg-blue-500',
      'PBKS': 'bg-red-500',
      'RR': 'bg-pink-500',
      'SRH': 'bg-orange-500',
      'GT': 'bg-blue-800',
      'LSG': 'bg-cyan-500'
    }
    return colors[shortName] || 'bg-blue-600'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
            {/* Left Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight font-['Poppins']">
                <span className="text-white">Elevate Your</span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Cricket Game
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
                The ultimate IPL team management platform. Streamline operations, 
                track performance, and make data-driven decisions that win championships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => navigate('/register')}
                  className="group bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
                >
                  <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Get Started Free
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-xl"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { value: teams.length || 10, label: 'IPL Teams', icon: Trophy, color: 'orange' },
                  { value: 250, label: 'Players (2024)', icon: Users, color: 'blue' },
                  { value: 74, label: 'Matches/Season', icon: Calendar, color: 'purple' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <stat.icon className="w-8 h-8 text-orange-400" />
                    </div>
                    <div className="text-3xl font-black text-white mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.label.includes('Players') ? '+' : ''} />
                    </div>
                    <div className="text-blue-200 text-base font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Optimized Video */}
            <motion.div 
              className="hidden lg:block -mt-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full h-auto rounded-2xl shadow-2xl max-w-4xl overflow-hidden">
                {!videoLoaded ? (
                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center cursor-pointer" onClick={() => setVideoLoaded(true)}>
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                      <h3 className="text-2xl font-bold mb-2">IPL Highlights</h3>
                      <p className="text-lg text-blue-100">Click to watch team videos</p>
                    </div>
                  </div>
                ) : (
                  <video 
                    key={currentVideo}
                    className="w-full aspect-video cursor-pointer"
                    muted 
                    playsInline
                    preload="metadata"
                    autoPlay
                    onClick={() => setCurrentVideo((prev) => (prev + 1) % videos.length)}
                    onEnded={() => setCurrentVideo((prev) => (prev + 1) % videos.length)}
                    onError={() => setVideoLoaded(false)}
                  >
                    <source src={videos[currentVideo]} type="video/mp4" />
                  </video>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-orange-500">IPL</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive tools designed specifically for IPL team management with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Player Management',
                description: 'Complete player profiles with statistics, performance tracking, and career analytics for all IPL players.',
                color: 'bg-blue-500',
                features: ['Player Statistics', 'Performance Tracking', 'Career Analytics', 'Auction History']
              },
              {
                icon: BarChart3,
                title: 'Team Analytics',
                description: 'Advanced team performance metrics, match analysis, and strategic insights for better decision making.',
                color: 'bg-green-500',
                features: ['Match Analysis', 'Team Comparisons', 'Win Predictions', 'Strategy Insights']
              },
              {
                icon: Trophy,
                title: 'Tournament Management',
                description: 'Complete IPL tournament tracking with fixtures, results, points table, and championship history.',
                color: 'bg-orange-500',
                features: ['Live Fixtures', 'Points Table', 'Match Results', 'Tournament History']
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful <span className="text-blue-600">Analytics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Get deep insights into team performance with our advanced analytics dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Pie Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Team Performance</h3>
              <div className="flex justify-center">
                <AnimatedPieChart 
                  data={[
                    { value: 35, color: '#3b82f6', label: 'Wins' },
                    { value: 25, color: '#ef4444', label: 'Losses' },
                    { value: 15, color: '#f59e0b', label: 'Draws' }
                  ]}
                />
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Wins</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Losses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Draws</span>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Player Stats</h3>
              <AnimatedBarChart 
                data={[
                  { value: 45, color: '#10b981', label: 'Runs' },
                  { value: 32, color: '#8b5cf6', label: 'Wickets' },
                  { value: 28, color: '#f59e0b', label: 'Catches' },
                  { value: 38, color: '#ef4444', label: 'Sixes' }
                ]}
                height={180}
              />
            </div>

            {/* Progress Rings */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Season Progress</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <AnimatedProgressRing 
                    percentage={75} 
                    size={70} 
                    color="#3b82f6" 
                    tooltip="55 out of 74 matches completed this season"
                  />
                  <div className="text-sm font-medium text-gray-600 mt-2">Matches</div>
                </div>
                <div className="text-center">
                  <AnimatedProgressRing 
                    percentage={68} 
                    size={70} 
                    color="#10b981" 
                    tooltip="Teams winning 68% of their home matches"
                  />
                  <div className="text-sm font-medium text-gray-600 mt-2">Win Rate</div>
                </div>
                <div className="text-center">
                  <AnimatedProgressRing 
                    percentage={92} 
                    size={70} 
                    color="#f59e0b" 
                    tooltip="Fan engagement at all-time high with 92% satisfaction"
                  />
                  <div className="text-sm font-medium text-gray-600 mt-2">Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Manage All <span className="text-orange-500">IPL Franchises</span>
            </h2>
            <p className="text-xl text-gray-600">Professional management tools for every team</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-200 animate-pulse p-6 rounded-xl h-32"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                ></motion.div>
              ))
            ) : (
              teams.map((team, index) => {
                const shortName = team.shortName || getTeamShortName(team.teamName)
                return (
                <motion.div
                  key={team.id}
                  className={`${getTeamColor(shortName)} p-6 rounded-xl text-center cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                  onClick={() => navigate('/teams')}
                  title={team.teamName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TeamLogo 
                    teamName={shortName} 
                    size="w-12 h-12" 
                    className="mx-auto mb-3 p-1"
                    removeBorder={true}
                  />
                  <div className="text-white font-bold text-lg">{shortName}</div>
                  <div className="text-white/80 text-xs mt-1 truncate">{team.teamName}</div>
                </motion.div>
                )
              })
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/teams')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Explore Teams
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-orange-500">Champions</span>
            </h2>
            <p className="text-xl text-gray-600">See how teams are winning with IPL</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: '40%',
                label: 'Improved Win Rate',
                description: 'Teams using our analytics see significant performance improvements'
              },
              {
                metric: '60%',
                label: 'Faster Decisions',
                description: 'Real-time data enables quicker strategic decision making'
              },
              {
                metric: '25%',
                label: 'Better Player Utilization',
                description: 'Optimized squad selection based on performance data'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-5xl font-bold text-orange-500 mb-4">{stat.metric}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Team?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the revolution in cricket management. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-xl"
            >
              <Award className="w-5 h-5 mr-2" />
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage