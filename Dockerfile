FROM node:18-slim

WORKDIR /usr/src/app

# Install production dependencies first for layer caching
COPY package*.json ./
RUN npm install --production

# Copy app sources
COPY . .

# Ensure uploads directory exists
RUN mkdir -p /usr/src/app/uploads

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
