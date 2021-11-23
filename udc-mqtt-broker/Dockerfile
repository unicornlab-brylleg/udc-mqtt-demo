FROM node:14-alpine 


ENV PORT 1883 
ENV HOST 0.0.0.0 

# Create app directory 
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app 

# Install app dependencies 
COPY . .

EXPOSE 1883

CMD [ "yarn", "start" ] 