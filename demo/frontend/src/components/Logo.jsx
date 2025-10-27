import React from 'react'

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  }

  return (
    <div className={`flex items-center ${className}`}>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
          IPL Manager
        </span>
      )}
    </div>
  )
}

export default Logo