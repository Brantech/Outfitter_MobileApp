FROM node:8.12-jessie
WORKDIR /usr/src/app
COPY ./outfitter-mobile-app .
RUN npm install
RUN npm install expo-cli --global
EXPOSE 19000 19001 19002
CMD [ "npm", "start" ]