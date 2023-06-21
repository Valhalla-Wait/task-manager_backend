FROM node:16-alpine AS builder
WORKDIR /build
RUN corepack enable pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm i --offline --frozen-lockfile
RUN apk add --no-cache openssl openssl-dev libssl1.1 libssl3
RUN rm -rf dist/
RUN pnpm prisma generate && pnpm build
RUN pnpm prune --prod
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/dist dist/
COPY --from=builder /build/prisma ./prisma
RUN corepack enable pnpm
EXPOSE 5000
CMD ["npx", "prisma", "migrate", "deploy", "&&", "pnpm", "run", "prod"]