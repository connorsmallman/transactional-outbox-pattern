FROM node:16

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Start the server using the production build
CMD [ "npm", "run", "start:dev" ]