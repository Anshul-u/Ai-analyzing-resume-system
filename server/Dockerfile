FROM node:20-alpine

WORKDIR /app

# Copy shared folder into the container
COPY shared/ ./shared/

# Copy server package files and install dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install

# Copy server source code
COPY server/ ./

EXPOSE 5000
CMD ["npm", "run", "dev"]