# Step 1: Use a lightweight Node.js image for building the React app
FROM node:22-slim AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

ENV GENERATE_SOURCEMAP=false

# Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the React app - Increase memory limit
RUN npm run build

# Step 2: Use a lightweight Nginx image to serve the app
FROM nginx:1.23-alpine

# Copy the build output from the previous step to Nginx's HTML directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
