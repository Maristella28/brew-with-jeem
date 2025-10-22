# Brew with Jeem - Application Startup Script
# This script starts both the Laravel backend and React frontend

Write-Host "Starting Brew with Jeem Application..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Start Laravel backend in a new PowerShell window
Write-Host "Starting Laravel Backend (port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host 'Laravel Backend Server' -ForegroundColor Cyan; Write-Host '======================' -ForegroundColor Cyan; Write-Host ''; php artisan serve"

# Wait a moment for backend to start
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start React frontend in a new PowerShell window
Write-Host "Starting React Frontend (port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Brew-With_Jeem; Write-Host 'React Frontend Server' -ForegroundColor Cyan; Write-Host '=====================' -ForegroundColor Cyan; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Application Started Successfully!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window (servers will continue running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

