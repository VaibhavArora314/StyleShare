# Style Share
A simple web-based platform where users can easily create, explore, and share Tailwind CSS components and designs with fellow users.

## TechStack
- TypeScript
- Express
- React
- Recoil
- Prisma + MongoDB
- Tailwind

# Setting Up on your machine
1. Go to the backend folder and create a .env file
  ```
  DATABASE_URL="Mongodb Connection String here"
  JWT_SECRET="secret"
  PORT=3001
  ```
2. Run the following commands in the backend folder
  ```
  npm install
  npm run build
  npm run dev
  ```
  The npm run build cmd will handle the Prisma migrations, and also build the frontend folder which will be served by the express server.
  
  Possible Problems:
  - Prisma may give error for MongoDB replica set, in such case use Mongodb atlas for the database instead of the local database or start a Mongo docker container with replica set.
3. In case you are modifying the frontend and you want hot module reloading, then run the following commands in the frontend directory
  ```
  npm install
  npm run dev
  ```
  Also, set the default base URL of the backend (don't push this to GitHub) or simply uncomment the following:
  https://github.com/VaibhavArora314/StyleShare/blob/ffb31d5bd3f68fbd76b300a736d56c2a0f1f77ac/frontend/src/App.tsx#L17-L18
