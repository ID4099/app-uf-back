FROM node:18

#Set Environments
ENV MONGO_URI=mongodb://mongo:HG22HfBDCCBCG4GbCEC5FacBF55aFF3h@viaduct.proxy.rlwy.net:32863
ENV JWT_CONSTANT_SECRET=tigrinelgatitoregalon

# Workdir app
WORKDIR /usr/src/app

# Copy all package*.json file
COPY package*.json ./

# Install dependencies
RUN npm install
# Or RUN yarn install

# Copy all file to docker-image
COPY . .

RUN npm run build
# Or RUN yarn build

# Expose server on port 3000
EXPOSE 3000

# Run start aplication
CMD ["npm", "start"]
# Or CMD ["yarn", "start"]
