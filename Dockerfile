# Use an official Node.js runtime as a parent image
FROM node:21
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./
COPY vercel.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code for any utilities / files needed.
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Define the command to run the app
CMD ["npm", "run", "dev"]
