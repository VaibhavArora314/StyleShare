FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run backend-build


EXPOSE 8000
CMD ["npm", "run" , "dev"] 