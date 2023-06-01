FROM node:16.20-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app
# Copy app sources and own them by user 'node' instead of root
COPY --chown=node:node . /usr/src/app

RUN npm ci --only=production && npm cache clean --force

USER node
CMD [ "dumb-init","node", "app.js" ]