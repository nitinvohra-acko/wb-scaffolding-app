# Use Node.js as the base image
FROM node:18

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy frontend files
COPY . ./

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

#COPY --from=build /usr/src/app/ /usr/src/app/

# Expose the port
EXPOSE 3003

# Start the React app
CMD ["npm", "start"]