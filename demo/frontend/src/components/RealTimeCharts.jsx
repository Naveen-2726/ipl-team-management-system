import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import apiService from '../services/apiService'

// Real-time Line Chart
export const RealTimeLineChart = ({ title, dataKey, height = 200 }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getTeams()
        const teams = response.content || response.data || response
        
        // Transform team data into chart data
        const chartData = teams.slice(0, 6).map((team, index) => ({
          name: team.teamName?.split(' ').map(w => w[0]).join('') || `T${index + 1}`,
          value: team.matchesWon || Math.floor(Math.random() * 15) + 5,
          color: getTeamColor(index)
        }))
        
        setData(chartData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback data
        setData([
          { name: 'CSK', value: 12, color: '#FFFF00' },
          { name: 'MI', value: 10, color: '#004BA0' },
          { name: 'RCB', value: 8, color: '#EC1C24' },
          { name: 'KKR', value: 9, color: '#3A225D' },
          { name: 'DC', value: 7, color: '#004C93' },
          { name: 'GT', value: 11, color: '#1C2841' }
        ])
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getTeamColor = (index) => {
    const colors = ['#FFFF00', '#004BA0', '#EC1C24', '#3A225D', '#004C93', '#1C2841']
    return colors[index] || '#3B82F6'
  }

  const maxValue = Math.max(...data.map(d => d.value), 1)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200 rounded animate-pulse"></div>
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="relative" style={{ height }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (item.value / maxValue) * 80
            
            return (
              <g key={item.name}>
                <motion.circle
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill={item.color}
                  initial={{ r: 0 }}
                  animate={{ r: 4 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                <text
                  x={`${x}%`}
                  y="95%"
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {item.name}
                </text>
                <text
                  x={`${x}%`}
                  y={`${y - 5}%`}
                  textAnchor="middle"
                  className="text-xs fill-gray-900 font-semibold"
                >
                  {item.value}
                </text>
              </g>
            )
          })}
          
          {/* Connect points with lines */}
          <motion.path
            d={`M ${data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - (item.value / maxValue) * 80
              return `${x},${y}`
            }).join(' L ')}`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>
    </div>
  )
}

// Real-time Donut Chart
export const RealTimeDonutChart = ({ title }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getTeams()
        const teams = response.content || response.data || response
        
        const chartData = teams.slice(0, 7).map((team, index) => {
          let teamName = team.teamName?.split(' ').map(w => w[0]).join('') || team.shortName || `T${index + 1}`
          let titleCount = team.titlesWon || 0
          
          // Ensure RCB shows 1 title
          if (teamName === 'RCB' || team.shortName === 'RCB') {
            titleCount = 1
          }
          
          return {
            name: teamName,
            value: titleCount,
            color: getTeamColor(index)
          }
        })
        
        setData(chartData)
        setLoading(false)
      } catch (error) {
        setData([
          { name: 'MI', value: 5, color: '#004BA0' },
          { name: 'CSK', value: 5, color: '#FFFF00' },
          { name: 'KKR', value: 2, color: '#3A225D' },
          { name: 'RCB', value: 1, color: '#EC1C24' },
          { name: 'RR', value: 1, color: '#EA1A85' },
          { name: 'SRH', value: 1, color: '#FF822A' },
          { name: 'GT', value: 1, color: '#1C2841' }
        ])
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 45000)
    return () => clearInterval(interval)
  }, [])

  const getTeamColor = (index) => {
    const colors = ['#004BA0', '#FFFF00', '#3A225D', '#EA1A85']
    return colors[index] || '#3B82F6'
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const size = 160
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let cumulativePercentage = 0

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gradient-to-r from-green-200 to-blue-200 rounded w-1/2 mb-4"></div>
          <div className="w-40 h-40 bg-gradient-to-r from-gray-200 via-green-100 to-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f3f4f6"
              strokeWidth="12"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const strokeDasharray = circumference
              const strokeDashoffset = circumference - (circumference * percentage) / 100
              const rotation = (cumulativePercentage * 360) / 100
              cumulativePercentage += percentage

              return (
                <motion.circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm text-gray-600">Titles</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Real-time Bar Chart
export const RealTimeBarChart = ({ title }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getTeams()
        const teams = response.content || response.data || response
        
        const chartData = teams.slice(0, 5).map((team, index) => ({
          name: team.teamName?.split(' ').map(w => w[0]).join('') || `T${index + 1}`,
          value: team.points || Math.floor(Math.random() * 20) + 5,
          color: getTeamColor(index)
        }))
        
        setData(chartData)
        setLoading(false)
      } catch (error) {
        setData([
          { name: 'GT', value: 20, color: '#1C2841' },
          { name: 'CSK', value: 17, color: '#FFFF00' },
          { name: 'MI', value: 16, color: '#004BA0' },
          { name: 'LSG', value: 15, color: '#0094DA' },
          { name: 'RCB', value: 14, color: '#EC1C24' }
        ])
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const getTeamColor = (index) => {
    const colors = ['#1C2841', '#FFFF00', '#004BA0', '#0094DA', '#EC1C24']
    return colors[index] || '#3B82F6'
  }

  const maxValue = Math.max(...data.map(d => d.value), 1)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gradient-to-r from-purple-200 to-orange-200 rounded w-1/2 mb-4"></div>
          <div className="flex items-end justify-center space-x-2 h-32">
            {[1,2,3,4,5].map(i => (
              <div 
                key={i} 
                className="flex-1 bg-gradient-to-t from-purple-200 to-orange-200 rounded-t animate-pulse" 
                style={{height: `${Math.random() * 80 + 20}%`}}
              ></div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-end justify-center space-x-4 h-48">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 160
          
          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className="rounded-t-lg shadow-sm"
                style={{ 
                  backgroundColor: item.color,
                  width: '32px'
                }}
                initial={{ height: 0 }}
                animate={{ height: barHeight }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              <div className="mt-2 text-xs text-gray-600 font-medium">{item.name}</div>
              <div className="text-sm font-bold text-gray-900">{item.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}