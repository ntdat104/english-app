rmdir /s /q "../backend/build"

move "./build" "../backend"

cd ..

cd backend

git add .

git commit -m "deploy"

git push heroku master