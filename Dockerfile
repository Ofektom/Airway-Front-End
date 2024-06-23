# Use a lightweight Node.js image for building the application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use an Nginx image to serve the built files
FROM nginx:stable-alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy the build output from the previous stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration file
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf

# Expose the port specified by Render or default to 80
ENV PORT 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
