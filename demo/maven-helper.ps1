# Maven Helper Script for IPL Team Management System
# Optimized commands for faster builds

Write-Host "IPL Team Management System - Maven Helper" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

function Clean-Build {
    Write-Host "Running clean build with optimizations..." -ForegroundColor Yellow
    .\mvnw clean compile -T 4 -U
}

function Fast-Build {
    Write-Host "Running fast incremental build..." -ForegroundColor Yellow
    .\mvnw compile -T 4
}

function Package-App {
    Write-Host "Packaging application..." -ForegroundColor Yellow
    .\mvnw clean package -T 4 -DskipTests
}

function Run-Tests {
    Write-Host "Running tests..." -ForegroundColor Yellow
    .\mvnw test -T 4
}

function Clear-Dependencies {
    Write-Host "Clearing Maven dependencies..." -ForegroundColor Red
    Write-Host "This will delete your local Maven repository!" -ForegroundColor Red
    $confirmation = Read-Host "Are you sure? (y/N)"
    if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
        Remove-Item -Recurse -Force "$env:USERPROFILE\.m2\repository"
        Write-Host "Dependencies cleared. Run Clean-Build next." -ForegroundColor Green
    }
}

function Show-Help {
    Write-Host "Available commands:" -ForegroundColor Cyan
    Write-Host "  Clean-Build      - Clean and compile with optimizations" -ForegroundColor White
    Write-Host "  Fast-Build       - Quick incremental build" -ForegroundColor White
    Write-Host "  Package-App      - Package the application" -ForegroundColor White
    Write-Host "  Run-Tests        - Run unit tests" -ForegroundColor White
    Write-Host "  Clear-Dependencies - Clear Maven local repository" -ForegroundColor White
    Write-Host "  Show-Help        - Show this help" -ForegroundColor White
}

# Show help by default
Show-Help