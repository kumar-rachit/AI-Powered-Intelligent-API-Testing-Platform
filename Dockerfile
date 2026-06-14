FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build React frontend
RUN npm run client:build

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
