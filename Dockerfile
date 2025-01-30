# Step 1: Use a lightweight Node.js image for building the React app
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Enable debug mode to trace each command
RUN set -ex

# Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package.json ./

# Install dependencies
RUN set -ex && npm i

# Copy the rest of the application source code
COPY . .

# Build the React app - Increase memory limit significantly
RUN set -ex && NODE_OPTIONS="--max_old_space_size=4096" npm run build

# If 8GB isn't enough, try 12GB or 16GB. But also consider optimizing your build.
# RUN set -ex && NODE_OPTIONS="--max-old-space-size=12288" npm run build
# RUN set -ex && NODE_OPTIONS="--max-old-space-size=16384" npm run build


# Step 2: Use a lightweight Nginx image to serve the app
FROM nginx:1.23-alpine

# Copy the build output from the previous step to Nginx's HTML directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
