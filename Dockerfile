# Base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port on which your application runs
# EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
