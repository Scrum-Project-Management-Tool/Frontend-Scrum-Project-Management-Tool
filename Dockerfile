# Dockerfile for Vite Frontend
FROM node:20

# Set the working directory
WORKDIR /app

# Copy all of the application
COPY . .

# Installing all dependencies specified in package.json.
RUN npm install

# Expose the application port
EXPOSE 5173  

# Start the application
CMD ["npm", "run" , "dev"]