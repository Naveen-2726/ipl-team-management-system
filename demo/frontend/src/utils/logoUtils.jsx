import React from 'react'

// Centralized logo utility for IPL teams
export const getTeamLogo = (teamName) => {
  if (!teamName) return 'ipl%20logo.png'
  
  // Normalize team name for matching
  const normalizedName = teamName.toString().trim()
  
  const teamMap = {
    // Full team names
    'Chennai Super Kings': 'csk.png',
    'Mumbai Indians': 'mi.jpeg',
    'Royal Challengers Bangalore': 'rcb.jpeg',
    'Kolkata Knight Riders': 'kkr.jpeg',
    'Delhi Capitals': 'dc.jpeg',
    'Rajasthan Royals': 'rr.png',
    'Punjab Kings': 'pbks.jpeg',
    'Sunrisers Hyderabad': 'srh.jpeg',
    'Gujarat Titans': 'gt.jpeg',
    'Lucknow Super Giants': 'lsg.jpeg',
    
    // Short team names
    'CSK': 'csk.png',
    'MI': 'mi.jpeg',
    'RCB': 'rcb.jpeg',
    'KKR': 'kkr.jpeg',
    'DC': 'dc.jpeg',
    'RR': 'rr.png',
    'PBKS': 'pbks.jpeg',
    'PK': 'pbks.jpeg',
    'SRH': 'srh.jpeg',
    'SH': 'srh.jpeg',
    'GT': 'gt.jpeg',
    'LSG': 'lsg.jpeg'
  }
  
  // Direct match first
  if (teamMap[normalizedName]) {
    return teamMap[normalizedName]
  }
  
  // Try case-insensitive match
  const lowerName = normalizedName.toLowerCase()
  for (const [key, value] of Object.entries(teamMap)) {
    if (key.toLowerCase() === lowerName) {
      return value
    }
  }
  
  // Try partial match for full names
  for (const [key, value] of Object.entries(teamMap)) {
    if (key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())) {
      return value
    }
  }
  
  console.warn(`No logo found for team: ${teamName}`);
  return 'ipl%20logo.png'
}

// Get team full name from short name
export const getTeamFullName = (shortName) => {
  const nameMap = {
    'CSK': 'Chennai Super Kings',
    'MI': 'Mumbai Indians', 
    'RCB': 'Royal Challengers Bangalore',
    'KKR': 'Kolkata Knight Riders',
    'DC': 'Delhi Capitals',
    'RR': 'Rajasthan Royals',
    'PBKS': 'Punjab Kings',
    'PK': 'Punjab Kings',
    'SRH': 'Sunrisers Hyderabad',
    'SH': 'Sunrisers Hyderabad',
    'GT': 'Gujarat Titans',
    'LSG': 'Lucknow Super Giants'
  }
  return nameMap[shortName] || shortName
}

export const getTeamColor = (teamName) => {
  const colorMap = {
    // Full team names
    'Chennai Super Kings': { primary: '#FFFF00', secondary: '#F59E0B' },
    'Mumbai Indians': { primary: '#004BA0', secondary: '#1E40AF' },
    'Royal Challengers Bangalore': { primary: '#EC1C24', secondary: '#DC2626' },
    'Kolkata Knight Riders': { primary: '#3A225D', secondary: '#7C2D12' },
    'Delhi Capitals': { primary: '#004C93', secondary: '#1E40AF' },
    'Rajasthan Royals': { primary: '#EA1A85', secondary: '#BE185D' },
    'Punjab Kings': { primary: '#ED1B24', secondary: '#B91C1C' },
    'Sunrisers Hyderabad': { primary: '#FF822A', secondary: '#EA580C' },
    'Gujarat Titans': { primary: '#1C2841', secondary: '#1E3A8A' },
    'Lucknow Super Giants': { primary: '#0094DA', secondary: '#0891B2' },
    
    // Short team names
    'CSK': { primary: '#FFFF00', secondary: '#F59E0B' },
    'MI': { primary: '#004BA0', secondary: '#1E40AF' },
    'RCB': { primary: '#EC1C24', secondary: '#DC2626' },
    'KKR': { primary: '#3A225D', secondary: '#7C2D12' },
    'DC': { primary: '#004C93', secondary: '#1E40AF' },
    'RR': { primary: '#EA1A85', secondary: '#BE185D' },
    'PBKS': { primary: '#ED1B24', secondary: '#B91C1C' },
    'PK': { primary: '#ED1B24', secondary: '#B91C1C' },
    'SRH': { primary: '#FF822A', secondary: '#EA580C' },
    'SH': { primary: '#FF822A', secondary: '#EA580C' },
    'GT': { primary: '#1C2841', secondary: '#1E3A8A' },
    'LSG': { primary: '#0094DA', secondary: '#0891B2' }
  }
  
  return colorMap[teamName] || { primary: '#FFFF00', secondary: '#F59E0B' }
}

// Component for consistent team logo rendering
export const TeamLogo = ({ 
  teamName, 
  size = 'w-12 h-12', 
  className = '', 
  rounded = '',
  objectFit = 'object-contain',
  style,
  removeBorder = true
}) => {
  const logoFileName = getTeamLogo(teamName)
  const logoSrc = `/logos/${logoFileName}`
  
  const baseClasses = `${size} ${objectFit} hover:scale-105 transition-transform duration-300`
  const borderClasses = removeBorder ? '' : rounded
  const finalClasses = `${baseClasses} ${borderClasses} ${className}`
  
  return (
    <img 
      src={logoSrc}
      alt={`${teamName} logo`}
      className={finalClasses}
      style={{
        filter: 'brightness(1.1) contrast(1.1)',
        ...style
      }}
      onError={(e) => {
        e.target.src = '/logos/ipl%20logo.png'
      }}
    />
  )
}

// Simple team badge component
export const TeamBadge = ({ teamName, size = 'medium', showName = true, className = '', removeBorder = true }) => {
  const logoFileName = getTeamLogo(teamName)
  const logoSrc = `/logos/${logoFileName}`
  
  const sizes = {
    small: { logo: 'w-6 h-6', text: 'text-xs' },
    medium: { logo: 'w-8 h-8', text: 'text-sm' },
    large: { logo: 'w-10 h-10', text: 'text-base' }
  }
  
  const currentSize = sizes[size]
  const borderClass = removeBorder ? '' : 'rounded'
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src={logoSrc}
        alt={`${teamName} logo`}
        className={`${currentSize.logo} object-contain ${borderClass}`}
        style={{
          filter: 'brightness(1.1) contrast(1.1)'
        }}
        onError={(e) => {
          e.target.src = '/logos/ipl%20logo.png'
        }}
      />
      {showName && (
        <span className={`${currentSize.text} font-semibold text-gray-900`}>
          {teamName}
        </span>
      )}
    </div>
  )
}

export default { getTeamLogo, getTeamColor, TeamLogo, TeamBadge }