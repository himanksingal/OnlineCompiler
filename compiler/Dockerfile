# Use the Node.js 24 Alpine image as the base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Install GCC and other necessary build tools
RUN apk update && apk add --no-cache g++
RUN apk add --no-cache openjdk11 python3

# Copy the rest of the application code.
# This layer will only be rebuilt if application code changes.
COPY . .
RUN npm install

EXPOSE 8080

# Specify the command to run when the container starts
CMD [ "node", "server.js" ]