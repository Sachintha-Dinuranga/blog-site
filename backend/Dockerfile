FROM node:22

WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of our app into container
COPY . .

# Set port environment variable
ENV PORT = 3000

# Expose the port 
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]