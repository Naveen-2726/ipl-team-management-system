package com.examly.springapp.config;

import com.examly.springapp.entity.Team;
import com.examly.springapp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(3) // Run after DatabaseConnectionTest and DataLoader
public class TeamDataLoader implements CommandLineRunner {

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== TeamDataLoader: Starting team data initialization ===");
        
        try {
            // Check if teams exist
            long teamCount = teamRepository.count();
            System.out.println("Current team count in database: " + teamCount);
            
            if (teamCount == 0) {
                createDefaultTeams();
            } else {
                updateTeamNames();
            }
            
            long finalTeamCount = teamRepository.count();
            System.out.println("Final team count in database: " + finalTeamCount);
            System.out.println("=== TeamDataLoader: Team data initialization completed ===");
            
        } catch (Exception e) {
            System.err.println("ERROR in TeamDataLoader: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private void createDefaultTeams() {
        System.out.println("Creating default IPL teams...");
        
        Team[] teams = {
            createTeam("Chennai Super Kings", "Chennai", 2008, "MS Dhoni", "Stephen Fleming", "M. A. Chidambaram Stadium", "India Cements", 4),
            createTeam("Mumbai Indians", "Mumbai", 2008, "Rohit Sharma", "Mahela Jayawardene", "Wankhede Stadium", "Reliance Industries", 5),
            createTeam("Royal Challengers Bangalore", "Bangalore", 2008, "Virat Kohli", "Mike Hesson", "M. Chinnaswamy Stadium", "United Spirits", 0),
            createTeam("Kolkata Knight Riders", "Kolkata", 2008, "Shreyas Iyer", "Brendon McCullum", "Eden Gardens", "Red Chillies Entertainment", 2),
            createTeam("Delhi Capitals", "Delhi", 2008, "Rishabh Pant", "Ricky Ponting", "Arun Jaitley Stadium", "GMR Group", 0),
            createTeam("Rajasthan Royals", "Jaipur", 2008, "Sanju Samson", "Kumar Sangakkara", "Sawai Mansingh Stadium", "Emerging Media", 1),
            createTeam("Punjab Kings", "Mohali", 2008, "Shikhar Dhawan", "Trevor Bayliss", "PCA Stadium", "Preity Zinta", 0),
            createTeam("Sunrisers Hyderabad", "Hyderabad", 2013, "Aiden Markram", "Brian Lara", "Rajiv Gandhi International Stadium", "Sun TV Network", 1),
            createTeam("Gujarat Titans", "Ahmedabad", 2022, "Hardik Pandya", "Ashish Nehra", "Narendra Modi Stadium", "CVC Capital Partners", 1),
            createTeam("Lucknow Super Giants", "Lucknow", 2022, "KL Rahul", "Justin Langer", "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium", "RPSG Group", 0)
        };
        
        for (Team team : teams) {
            Team savedTeam = teamRepository.save(team);
            System.out.println("✓ Created team: " + savedTeam.getTeamName() + " (ID: " + savedTeam.getId() + ")");
        }
    }
    
    private void updateTeamNames() {
        System.out.println("Updating team names to ensure consistency...");
        
        // Update Punjab team name
        teamRepository.findByTeamNameContainingIgnoreCase("Punjab").forEach(team -> {
            if (!team.getTeamName().equals("Punjab Kings")) {
                team.setTeamName("Punjab Kings");
                teamRepository.save(team);
                System.out.println("✓ Updated team name to: Punjab Kings");
            }
        });
        
        // Update Sunrisers team name
        teamRepository.findByTeamNameContainingIgnoreCase("Sunris").forEach(team -> {
            if (!team.getTeamName().equals("Sunrisers Hyderabad")) {
                team.setTeamName("Sunrisers Hyderabad");
                teamRepository.save(team);
                System.out.println("✓ Updated team name to: Sunrisers Hyderabad");
            }
        });
    }
    
    private Team createTeam(String name, String city, int foundedYear, String captain, String coach, String homeGround, String owner, int titles) {
        Team team = new Team();
        team.setTeamName(name);
        team.setCity(city);
        team.setFoundedYear(foundedYear);
        team.setCaptain(captain);
        team.setCoach(coach);
        team.setHomeGround(homeGround);
        team.setOwner(owner);
        team.setTitlesWon(titles);
        team.setMatchesPlayed(0);
        team.setMatchesWon(0);
        team.setPoints(0);
        return team;
    }
}