# Use Node.js as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY migrations ./migrations

COPY migrate-mongo-config.js .

# Start the NestJS application
CMD ["npx", "--yes", "migrate-mongo", "up"]
