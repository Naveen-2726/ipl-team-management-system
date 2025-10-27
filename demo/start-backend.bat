@echo off
echo ========================================
echo   IPL Team Management System - Backend
echo ========================================
echo.
echo Starting Spring Boot Application...
echo Backend will be available at: http://localhost:8080
echo Swagger UI: http://localhost:8080/swagger-ui/index.html
echo.

cd /d "%~dp0"
mvn clean compile
if %errorlevel% neq 0 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo Starting application...
mvn spring-boot:run

pause