@echo off
echo ========================================
echo   IPL Team Management System - Full Stack
echo ========================================
echo.
echo This will start both Backend and Frontend
echo Backend: http://localhost:8082
echo Frontend: http://localhost:5173
echo.
echo Press any key to continue...
pause >nul

echo Starting Backend in new window...
start "IPL Backend" cmd /k "cd /d \"%~dp0\" && start-backend.bat"

echo Waiting 10 seconds for backend to initialize...
timeout /t 10 /nobreak >nul

echo Starting Frontend in new window...
start "IPL Frontend" cmd /k "cd /d \"%~dp0\frontend\" && start-frontend.bat"

echo.
echo Both services are starting...
echo Backend: http://localhost:8082
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul