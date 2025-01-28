# Step 1: Use a lightweight Node.js image for building the React app
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies to save space
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY . . 

RUN npm run build

# Step 2: Use a lightweight Nginx image to serve the app
FROM nginx:1.23-alpine

# Copy the build output from the previous step to Nginx's HTML directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
