# 🏏 IPL Team Management System - Complete Setup Guide

## 📋 Prerequisites
- **Java 17+** installed
- **Node.js 16+** installed  
- **MySQL 8.0+** running on localhost:3306
- **Git** (optional)

## 🗄️ Database Setup

### 1. Start MySQL Server
```bash
# Windows (if MySQL service is not running)
net start mysql80

# Or start MySQL Workbench/XAMPP
```

### 2. Create Database
```sql
CREATE DATABASE iplteam;
USE iplteam;

-- Database will be auto-created by Spring Boot with tables
```

## 🚀 Running the System

### Backend (Spring Boot) - Terminal 1
```bash
# Navigate to project root
cd "c:\Users\Admin\OneDrive\Desktop\IPL TEAM MANAGEMENT SYSTEM\demo"

# Clean and compile
mvn clean compile

# Run the application
mvn spring-boot:run

# Alternative: Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Backend will start on:** `http://localhost:8082`
**Swagger API Docs:** `http://localhost:8082/swagger-ui/index.html`

### Frontend (React + Vite) - Terminal 2
```bash
# Navigate to frontend directory
cd "c:\Users\Admin\OneDrive\Desktop\IPL TEAM MANAGEMENT SYSTEM\demo\frontend"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Alternative: Build for production
npm run build
npm run preview
```

**Frontend will start on:** `http://localhost:5173`

## 🔧 Quick Commands

### Backend Commands
```bash
# Clean build
mvn clean package

# Run tests
mvn test

# Generate JAR
mvn clean package -DskipTests

# Run JAR directly
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Frontend Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React Application |
| **Backend API** | http://localhost:8082 | Spring Boot REST API |
| **Swagger UI** | http://localhost:8082/swagger-ui/index.html | API Documentation |
| **H2 Console** | http://localhost:8082/h2-console | Database Console (if H2) |

## 🔐 Default Credentials
- **Admin User**: Create via registration or API
- **Database**: root/root (MySQL)

## 🐛 Troubleshooting

### Backend Issues
```bash
# Port already in use
netstat -ano | findstr :8082
taskkill /PID <PID> /F

# Database connection issues
# Check MySQL is running and credentials in application.properties
```

### Frontend Issues
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Port issues
# Vite will auto-select available port
```

## 📱 Features Available
- ✅ Team Management
- ✅ Player Registration  
- ✅ Match Scheduling
- ✅ Performance Analytics
- ✅ Admin Dashboard
- ✅ Real-time Updates
- ✅ Responsive Design