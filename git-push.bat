@echo off
cd /d "%~dp0"
echo Adding all changes...
git add -A
echo.
echo Committing...
git commit -m "docs: улучшить README, исправить .env.example"
echo.
echo Pushing to GitHub...
git push origin main
echo.
echo Done! Press any key to close.
pause >nul
