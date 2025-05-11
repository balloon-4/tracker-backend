FROM node:22-alpine AS base
RUN corepack enable

FROM base AS base-installer
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder
WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./prisma ./prisma
RUN npm ci

# Copy everything else
COPY . .

RUN npm run build

FROM base AS prod-deps
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
# prisma is run after ci so this is needed here
COPY ./prisma ./prisma
RUN npm ci --omit=dev

FROM base AS runner
RUN apk add --no-cache openssl

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
COPY --chown=nodejs:nodejs --from=builder /app/api ./api
COPY --chown=nodejs:nodejs --from=prod-deps /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist
COPY --chown=nodejs:nodejs --from=builder /app/prisma ./prisma
COPY --chown=nodejs:nodejs --from=prod-deps /app/node_modules/.prisma/client node_modules/.prisma/client
RUN chown nodejs:nodejs /app

USER nodejs

ENV PORT=3000

CMD ["sh", "-c", "npx prisma migrate deploy && node --enable-source-maps --no-warnings=ExperimentalWarning ./dist/server.js"]