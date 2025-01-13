# Step 1: Build the React app
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN NODE_OPTIONS="--max_old_space_size=4096" npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output from the previous step to Nginx's HTML directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
