FROM node:20-alpine

WORKDIR /frontend

# Kopiera package files
COPY frontend/package*.json ./ 

# Installera dependencies
RUN npm install

# Kopiera all kod
COPY frontend/. ./

# Bygg applikationen
RUN npm run build

# Exponera port
EXPOSE 3000

# Starta applikationen
CMD ["npm", "start"]