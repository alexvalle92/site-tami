FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

COPY nutri-online-v1.html ./
COPY nutri-bariatrica-v1.html ./
COPY consultaPremium.html ./
COPY consultoriaSmart.html ./
COPY preco.html ./
COPY programaSejaLeve.html ./
COPY css/ ./css/
COPY js/ ./js/
COPY img/ ./img/
COPY video/ ./video/
COPY vendor/ ./vendor/

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/server.js"]
