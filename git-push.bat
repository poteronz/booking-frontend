@echo off
cd /d "%~dp0"
echo Adding all changes...
git add -A
echo.
echo Committing...
git commit -m "fix: remove unused Card import for Vercel build"
echo.
echo Pushing to GitHub...
git push origin main
echo.
echo Done! Press any key to close.
pause >nul
