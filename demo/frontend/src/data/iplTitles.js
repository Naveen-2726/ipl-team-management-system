// Correct IPL Title Counts (as of 2024)
export const iplTitleCounts = {
  'Chennai Super Kings': 5,    // 2010, 2011, 2018, 2021, 2023
  'CSK': 5,
  
  'Mumbai Indians': 5,         // 2013, 2015, 2017, 2019, 2020
  'MI': 5,
  
  'Kolkata Knight Riders': 2, // 2012, 2014
  'KKR': 2,
  
  'Rajasthan Royals': 1,      // 2008
  'RR': 1,
  
  'Sunrisers Hyderabad': 1,   // 2016
  'SRH': 1,
  
  'Gujarat Titans': 1,        // 2022
  'GT': 1,
  
  'Royal Challengers Bangalore': 1,
  'RCB': 1,
  
  'Delhi Capitals': 0,
  'DC': 0,
  
  'Punjab Kings': 0,
  'PBKS': 0,
  
  'Lucknow Super Giants': 0,
  'LSG': 0
}

// Function to get correct title count for any team
export const getTeamTitles = (teamName) => {
  return iplTitleCounts[teamName] || 0
}

// Most successful teams by titles
export const titleLeaderboard = [
  { team: 'Chennai Super Kings', titles: 5, years: ['2010', '2011', '2018', '2021', '2023'] },
  { team: 'Mumbai Indians', titles: 5, years: ['2013', '2015', '2017', '2019', '2020'] },
  { team: 'Kolkata Knight Riders', titles: 2, years: ['2012', '2014'] },

  { team: 'Rajasthan Royals', titles: 1, years: ['2008'] },
  { team: 'Sunrisers Hyderabad', titles: 1, years: ['2016'] },
  { team: 'Gujarat Titans', titles: 1, years: ['2022'] },
  { team: 'Royal Challengers Bangalore', titles: 1, years: ['2024'] }
]