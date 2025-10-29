# Use OpenJDK 21 image (matching your pom.xml Java version)
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven/Gradle build output (your JAR file)
COPY target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Run the application with production profile
ENTRYPOINT ["java", "-Dspring.profiles.active=production", "-jar", "app.jar"]