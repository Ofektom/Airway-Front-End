# Stage 1: Build the React application using Vite
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application using Vite
RUN npm run build

# Stage 2: Serve the application using a simple Node.js server
FROM node:20-alpine

# Install serve globally
RUN npm install -g serve

# Copy the built files from the previous stage
COPY --from=build /app/dist /app/dist

# Set the working directory
WORKDIR /app/dist

# Serve the application on port 3000
EXPOSE 3000

# Use serve to serve the static files
CMD ["serve", "-s", ".", "-l", "3000"]
