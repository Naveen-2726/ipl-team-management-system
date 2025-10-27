// IPL 2025 Complete Data
export const ipl2025Teams = [
  {
    id: 1,
    teamName: 'Chennai Super Kings',
    shortName: 'CSK',
    city: 'Chennai',
    captain: 'Ruturaj Gaikwad',
    coach: 'Stephen Fleming',
    foundedYear: 2008,
    titlesWon: 5,
    homeGround: 'M. A. Chidambaram Stadium',
    owner: 'Chennai Super Kings Cricket Ltd',
    colors: { primary: '#FFFF00', secondary: '#F59E0B' }
  },
  {
    id: 2,
    teamName: 'Mumbai Indians',
    shortName: 'MI',
    city: 'Mumbai',
    captain: 'Hardik Pandya',
    coach: 'Mahela Jayawardene',
    foundedYear: 2008,
    titlesWon: 5,
    homeGround: 'Wankhede Stadium',
    owner: 'Reliance Industries',
    colors: { primary: '#004BA0', secondary: '#1E40AF' }
  },
  {
    id: 3,
    teamName: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    city: 'Bangalore',
    captain: 'Virat Kohli',
    coach: 'Andy Flower',
    foundedYear: 2008,
    titlesWon: 1,
    homeGround: 'M. Chinnaswamy Stadium',
    owner: 'United Spirits',
    colors: { primary: '#EC1C24', secondary: '#DC2626' }
  },
  {
    id: 4,
    teamName: 'Kolkata Knight Riders',
    shortName: 'KKR',
    city: 'Kolkata',
    captain: 'Shreyas Iyer',
    coach: 'Chandrakant Pandit',
    foundedYear: 2008,
    titlesWon: 2,
    homeGround: 'Eden Gardens',
    owner: 'Red Chillies Entertainment',
    colors: { primary: '#3A225D', secondary: '#7C2D12' }
  },
  {
    id: 5,
    teamName: 'Delhi Capitals',
    shortName: 'DC',
    city: 'Delhi',
    captain: 'Rishabh Pant',
    coach: 'Ricky Ponting',
    foundedYear: 2008,
    titlesWon: 0,
    homeGround: 'Arun Jaitley Stadium',
    owner: 'JSW Group',
    colors: { primary: '#004C93', secondary: '#1E40AF' }
  },
  {
    id: 6,
    teamName: 'Punjab Kings',
    shortName: 'PBKS',
    city: 'Mohali',
    captain: 'Shikhar Dhawan',
    coach: 'Trevor Bayliss',
    foundedYear: 2008,
    titlesWon: 0,
    homeGround: 'PCA Stadium',
    owner: 'Mohit Burman',
    colors: { primary: '#ED1B24', secondary: '#B91C1C' }
  },
  {
    id: 7,
    teamName: 'Rajasthan Royals',
    shortName: 'RR',
    city: 'Jaipur',
    captain: 'Sanju Samson',
    coach: 'Kumar Sangakkara',
    foundedYear: 2008,
    titlesWon: 1,
    homeGround: 'Sawai Mansingh Stadium',
    owner: 'Emerging Media',
    colors: { primary: '#EA1A85', secondary: '#BE185D' }
  },
  {
    id: 8,
    teamName: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    city: 'Hyderabad',
    captain: 'Pat Cummins',
    coach: 'Daniel Vettori',
    foundedYear: 2013,
    titlesWon: 1,
    homeGround: 'Rajiv Gandhi International Stadium',
    owner: 'Sun TV Network',
    colors: { primary: '#FF822A', secondary: '#EA580C' }
  },
  {
    id: 9,
    teamName: 'Gujarat Titans',
    shortName: 'GT',
    city: 'Ahmedabad',
    captain: 'Shubman Gill',
    coach: 'Ashish Nehra',
    foundedYear: 2022,
    titlesWon: 1,
    homeGround: 'Narendra Modi Stadium',
    owner: 'CVC Capital Partners',
    colors: { primary: '#1C2841', secondary: '#1E3A8A' }
  },
  {
    id: 10,
    teamName: 'Lucknow Super Giants',
    shortName: 'LSG',
    city: 'Lucknow',
    captain: 'KL Rahul',
    coach: 'Justin Langer',
    foundedYear: 2022,
    titlesWon: 0,
    homeGround: 'Ekana Cricket Stadium',
    owner: 'RPSG Group',
    colors: { primary: '#0094DA', secondary: '#0891B2' }
  }
]

export const ipl2025Players = [
  // Chennai Super Kings
  { id: 1, playerName: 'Ruturaj Gaikwad', age: 28, role: 'Batsman', teamId: 1, nationality: 'India', priceCrores: 18, runsScored: 2890, wicketsTaken: 0, battingAverage: 42.5, strikeRate: 136.8 },
  { id: 2, playerName: 'MS Dhoni', age: 43, role: 'Wicket Keeper', teamId: 1, nationality: 'India', priceCrores: 12, runsScored: 5082, wicketsTaken: 0, battingAverage: 39.2, strikeRate: 135.9 },
  { id: 3, playerName: 'Ravindra Jadeja', age: 36, role: 'All Rounder', teamId: 1, nationality: 'India', priceCrores: 16, runsScored: 2756, wicketsTaken: 157, battingAverage: 31.8, strikeRate: 127.3 },
  { id: 4, playerName: 'Deepak Chahar', age: 32, role: 'Bowler', teamId: 1, nationality: 'India', priceCrores: 14, runsScored: 92, wicketsTaken: 72, battingAverage: 12.5, strikeRate: 118.7 },
  
  // Mumbai Indians
  { id: 5, playerName: 'Hardik Pandya', age: 31, role: 'All Rounder', teamId: 2, nationality: 'India', priceCrores: 15, runsScored: 3386, wicketsTaken: 42, battingAverage: 28.7, strikeRate: 143.4 },
  { id: 6, playerName: 'Rohit Sharma', age: 37, role: 'Batsman', teamId: 2, nationality: 'India', priceCrores: 16, runsScored: 6628, wicketsTaken: 15, battingAverage: 30.4, strikeRate: 130.7 },
  { id: 7, playerName: 'Jasprit Bumrah', age: 31, role: 'Bowler', teamId: 2, nationality: 'India', priceCrores: 12, runsScored: 70, wicketsTaken: 165, battingAverage: 8.9, strikeRate: 115.2 },
  { id: 8, playerName: 'Suryakumar Yadav', age: 34, role: 'Batsman', teamId: 2, nationality: 'India', priceCrores: 8, runsScored: 3389, wicketsTaken: 0, battingAverage: 29.8, strikeRate: 135.9 },
  
  // Royal Challengers Bangalore
  { id: 9, playerName: 'Virat Kohli', age: 36, role: 'Batsman', teamId: 3, nationality: 'India', priceCrores: 17, runsScored: 8004, wicketsTaken: 4, battingAverage: 37.8, strikeRate: 131.9 },
  { id: 10, playerName: 'Faf du Plessis', age: 40, role: 'Batsman', teamId: 3, nationality: 'South Africa', priceCrores: 7, runsScored: 1633, wicketsTaken: 0, battingAverage: 36.3, strikeRate: 127.9 },
  { id: 11, playerName: 'Glenn Maxwell', age: 36, role: 'All Rounder', teamId: 3, nationality: 'Australia', priceCrores: 11, runsScored: 2771, wicketsTaken: 38, battingAverage: 26.4, strikeRate: 154.3 },
  { id: 12, playerName: 'Mohammed Siraj', age: 30, role: 'Bowler', teamId: 3, nationality: 'India', priceCrores: 7, runsScored: 89, wicketsTaken: 93, battingAverage: 11.1, strikeRate: 108.5 },
  
  // Kolkata Knight Riders
  { id: 13, playerName: 'Shreyas Iyer', age: 30, role: 'Batsman', teamId: 4, nationality: 'India', priceCrores: 12.25, runsScored: 3127, wicketsTaken: 0, battingAverage: 31.3, strikeRate: 123.8 },
  { id: 14, playerName: 'Andre Russell', age: 36, role: 'All Rounder', teamId: 4, nationality: 'West Indies', priceCrores: 12, runsScored: 2390, wicketsTaken: 73, battingAverage: 29.6, strikeRate: 169.4 },
  { id: 15, playerName: 'Sunil Narine', age: 36, role: 'All Rounder', teamId: 4, nationality: 'West Indies', priceCrores: 6, runsScored: 1025, wicketsTaken: 158, battingAverage: 16.9, strikeRate: 146.8 },
  { id: 16, playerName: 'Varun Chakaravarthy', age: 33, role: 'Bowler', teamId: 4, nationality: 'India', priceCrores: 8, runsScored: 12, wicketsTaken: 71, battingAverage: 4.0, strikeRate: 85.7 },
  
  // Delhi Capitals
  { id: 17, playerName: 'Rishabh Pant', age: 27, role: 'Wicket Keeper', teamId: 5, nationality: 'India', priceCrores: 16, runsScored: 3284, wicketsTaken: 0, battingAverage: 34.9, strikeRate: 126.0 },
  { id: 18, playerName: 'Axar Patel', age: 31, role: 'All Rounder', teamId: 5, nationality: 'India', priceCrores: 9, runsScored: 1058, wicketsTaken: 85, battingAverage: 23.5, strikeRate: 127.8 },
  { id: 19, playerName: 'Kuldeep Yadav', age: 30, role: 'Bowler', teamId: 5, nationality: 'India', priceCrores: 2, runsScored: 24, wicketsTaken: 65, battingAverage: 6.0, strikeRate: 92.3 },
  { id: 20, playerName: 'Prithvi Shaw', age: 25, role: 'Batsman', teamId: 5, nationality: 'India', priceCrores: 7.5, runsScored: 1892, wicketsTaken: 0, battingAverage: 24.9, strikeRate: 147.4 },
  
  // Punjab Kings
  { id: 21, playerName: 'Shikhar Dhawan', age: 39, role: 'Batsman', teamId: 6, nationality: 'India', priceCrores: 8.25, runsScored: 6769, wicketsTaken: 3, battingAverage: 35.2, strikeRate: 127.1 },
  { id: 22, playerName: 'Kagiso Rabada', age: 29, role: 'Bowler', teamId: 6, nationality: 'South Africa', priceCrores: 9.25, runsScored: 67, wicketsTaken: 76, battingAverage: 11.2, strikeRate: 111.7 },
  { id: 23, playerName: 'Liam Livingstone', age: 31, role: 'All Rounder', teamId: 6, nationality: 'England', priceCrores: 11.5, runsScored: 778, wicketsTaken: 15, battingAverage: 25.9, strikeRate: 144.4 },
  { id: 24, playerName: 'Jonny Bairstow', age: 35, role: 'Wicket Keeper', teamId: 6, nationality: 'England', priceCrores: 6.75, runsScored: 1038, wicketsTaken: 0, battingAverage: 28.8, strikeRate: 142.4 },
  
  // Rajasthan Royals
  { id: 25, playerName: 'Sanju Samson', age: 30, role: 'Wicket Keeper', teamId: 7, nationality: 'India', priceCrores: 14, runsScored: 3668, wicketsTaken: 0, battingAverage: 29.9, strikeRate: 136.1 },
  { id: 26, playerName: 'Jos Buttler', age: 34, role: 'Wicket Keeper', teamId: 7, nationality: 'England', priceCrores: 10, runsScored: 3582, wicketsTaken: 0, battingAverage: 40.7, strikeRate: 149.4 },
  { id: 27, playerName: 'Yashasvi Jaiswal', age: 23, role: 'Batsman', teamId: 7, nationality: 'India', priceCrores: 4, runsScored: 1254, wicketsTaken: 0, battingAverage: 30.3, strikeRate: 140.1 },
  { id: 28, playerName: 'Yuzvendra Chahal', age: 34, role: 'Bowler', teamId: 7, nationality: 'India', priceCrores: 6.5, runsScored: 109, wicketsTaken: 205, battingAverage: 7.6, strikeRate: 95.6 },
  
  // Sunrisers Hyderabad
  { id: 29, playerName: 'Pat Cummins', age: 31, role: 'Bowler', teamId: 8, nationality: 'Australia', priceCrores: 20.5, runsScored: 337, wicketsTaken: 53, battingAverage: 16.9, strikeRate: 151.1 },
  { id: 30, playerName: 'Aiden Markram', age: 30, role: 'Batsman', teamId: 8, nationality: 'South Africa', priceCrores: 2, runsScored: 1028, wicketsTaken: 3, battingAverage: 36.7, strikeRate: 140.4 },
  { id: 31, playerName: 'Abhishek Sharma', age: 24, role: 'All Rounder', teamId: 8, nationality: 'India', priceCrores: 6.5, runsScored: 1017, wicketsTaken: 12, battingAverage: 24.2, strikeRate: 168.3 },
  { id: 32, playerName: 'Bhuvneshwar Kumar', age: 35, role: 'Bowler', teamId: 8, nationality: 'India', priceCrores: 4.2, runsScored: 217, wicketsTaken: 181, battingAverage: 12.1, strikeRate: 115.4 },
  
  // Gujarat Titans
  { id: 33, playerName: 'Shubman Gill', age: 25, role: 'Batsman', teamId: 9, nationality: 'India', priceCrores: 16, runsScored: 2778, wicketsTaken: 0, battingAverage: 31.8, strikeRate: 132.9 },
  { id: 34, playerName: 'Rashid Khan', age: 26, role: 'All Rounder', teamId: 9, nationality: 'Afghanistan', priceCrores: 15, runsScored: 624, wicketsTaken: 93, battingAverage: 17.3, strikeRate: 127.6 },
  { id: 35, playerName: 'David Miller', age: 35, role: 'Batsman', teamId: 9, nationality: 'South Africa', priceCrores: 3, runsScored: 2062, wicketsTaken: 0, battingAverage: 40.2, strikeRate: 142.7 },
  { id: 36, playerName: 'Mohammed Shami', age: 34, role: 'Bowler', teamId: 9, nationality: 'India', priceCrores: 6.25, runsScored: 92, wicketsTaken: 114, battingAverage: 9.2, strikeRate: 118.7 },
  
  // Lucknow Super Giants
  { id: 37, playerName: 'KL Rahul', age: 32, role: 'Wicket Keeper', teamId: 10, nationality: 'India', priceCrores: 17, runsScored: 4683, wicketsTaken: 0, battingAverage: 47.3, strikeRate: 134.6 },
  { id: 38, playerName: 'Nicholas Pooran', age: 29, role: 'Wicket Keeper', teamId: 10, nationality: 'West Indies', priceCrores: 16, runsScored: 1815, wicketsTaken: 0, battingAverage: 29.3, strikeRate: 151.7 },
  { id: 39, playerName: 'Marcus Stoinis', age: 35, role: 'All Rounder', teamId: 10, nationality: 'Australia', priceCrores: 6.4, runsScored: 1388, wicketsTaken: 30, battingAverage: 27.8, strikeRate: 135.4 },
  { id: 40, playerName: 'Ravi Bishnoi', age: 24, role: 'Bowler', teamId: 10, nationality: 'India', priceCrores: 4, runsScored: 45, wicketsTaken: 44, battingAverage: 7.5, strikeRate: 112.5 }
]