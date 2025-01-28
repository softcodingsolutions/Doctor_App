# Step 1: Use a lightweight Node.js image for building the React app
FROM node:20-alpine AS build
ENV NODE_OPTIONS="--max-old-space-size=2048" 
# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY . . 

# Build the React app
RUN npm run build || { echo "Build failed"; cat npm-debug.log; exit 1; }

# Step 2: Use a lightweight Nginx image to serve the app
FROM nginx:1.23-alpine

# Copy the build output from the previous step to Nginx's HTML directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
