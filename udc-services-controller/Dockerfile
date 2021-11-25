FROM node:14-alpine 


ENV PORT 9002 
ENV HOST 0.0.0.0 

# Create app directory 
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app 

# Install app dependencies 
COPY package*.json /usr/src/app/ 
COPY package.json /usr/src/app/ 
COPY . /usr/src/app/
RUN npm install 

EXPOSE 9002

CMD [ "npm", "start" ] 