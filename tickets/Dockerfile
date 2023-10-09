FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
# copy-over everything else from the project directory into the “/app” folder
COPY . .
# setup command to run when the image/container starts up
CMD ["npm", "start"]