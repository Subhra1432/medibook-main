@echo off
title MediBook Launcher
echo Starting MediBook...

start "MediBook Backend" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul
start "MediBook Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 3 /nobreak >nul
start http://localhost:3000

echo Done! App is opening in your browser...