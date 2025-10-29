# Use official OpenJDK 21 image for building
FROM openjdk:21-jdk-slim AS build

# Set working directory inside container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for better layer caching)
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src ./src

# Make Maven wrapper executable and build the project (creates target/*.jar)
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# Use a smaller runtime image for final container
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the JAR file from the previous build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the JAR with production profile
ENTRYPOINT ["java", "-Dspring.profiles.active=production", "-jar", "app.jar"]