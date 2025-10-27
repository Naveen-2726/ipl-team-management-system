import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Animated Pie Chart Component
export const AnimatedPieChart = ({ data, size = 120 }) => {
  const [animatedData, setAnimatedData] = useState([])
  const [hoveredSegment, setHoveredSegment] = useState(null)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 500)
    return () => clearTimeout(timer)
  }, [data])

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  return (
    <div className="relative group">
      <svg width={size} height={size} className="transform -rotate-90">
        {animatedData.map((item, index) => {
          const percentage = (item.value / total) * 100
          const strokeDasharray = `${percentage} ${100 - percentage}`
          const strokeDashoffset = -cumulativePercentage
          cumulativePercentage += percentage

          return (
            <motion.circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 10}
              fill="transparent"
              stroke={item.color}
              strokeWidth="20"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDasharray: "0 100" }}
              animate={{ strokeDasharray }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
              className="drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </div>
      
      {/* Tooltip */}
      {hoveredSegment !== null && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
          <div className="font-semibold">{data[hoveredSegment]?.label}</div>
          <div>{data[hoveredSegment]?.value} ({Math.round((data[hoveredSegment]?.value / total) * 100)}%)</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}

// Animated Bar Chart Component
export const AnimatedBarChart = ({ data, height = 200 }) => {
  const [hoveredBar, setHoveredBar] = useState(null)
  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <div className="relative flex items-end justify-center space-x-4" style={{ height }}>
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * (height - 40)
        
        return (
          <div key={index} className="flex flex-col items-center relative">
            <motion.div
              className="rounded-t-lg shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                backgroundColor: item.color,
                width: '40px'
              }}
              initial={{ height: 0 }}
              animate={{ height: barHeight }}
              transition={{ duration: 1, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            />
            <div className="mt-2 text-xs text-gray-600 font-medium">{item.label}</div>
            <div className="text-sm font-bold text-gray-900">{item.value}</div>
            
            {/* Tooltip */}
            {hoveredBar === index && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                <div className="font-semibold">{item.label}</div>
                <div>Value: {item.value}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Animated Donut Chart Component
export const AnimatedDonutChart = ({ data, size = 140 }) => {
  const [animatedData, setAnimatedData] = useState([])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 300)
    return () => clearTimeout(timer)
  }, [data])

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = size / 2 - 20
  const circumference = 2 * Math.PI * radius
  let cumulativePercentage = 0

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f3f4f6"
          strokeWidth="16"
        />
        {animatedData.map((item, index) => {
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
              strokeWidth="16"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
              style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
              className="drop-shadow-sm"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-600">Teams</div>
        </div>
      </div>
    </div>
  )
}

// Animated Progress Ring
export const AnimatedProgressRing = ({ percentage, size = 80, color = "#3b82f6", label = "", tooltip = "" }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const radius = size / 2 - 8
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * animatedPercentage) / 100

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 300)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="relative flex flex-col items-center group">
      <div 
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f3f4f6"
            strokeWidth="6"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-sm hover:opacity-80 transition-opacity"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-bold text-gray-900">{Math.round(animatedPercentage)}%</div>
            {label && <div className="text-xs text-gray-600">{label}</div>}
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      {isHovered && tooltip && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
          <div>{tooltip}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}