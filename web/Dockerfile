FROM node:12.17-alpine as development

RUN apk add --no-cache bash coreutils grep sed

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock .

RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "dev"]

FROM node:12.17-alpine as production-builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock .

RUN yarn i --only=prod

COPY . .

RUN yarn build

FROM node:12.17-alpine as production

WORKDIR /usr/src/app

COPY --from=production-builder /usr/src/app/node_modules ./node_modules
COPY --from=production-builder /usr/src/app/public ./public
COPY --from=production-builder /usr/src/app/.next ./.next
COPY --from=production-builder /usr/src/app/lib ./lib
COPY --from=production-builder /usr/src/app/next-env.d.ts ./next-env.d.ts
COPY --from=production-builder /usr/src/app/next-i18next.config.js ./next-i18next.config.js
COPY --from=production-builder /usr/src/app/next-sitemap.js ./next-sitemap.js
COPY --from=production-builder /usr/src/app/next.config.js ./next.config.js
COPY --from=production-builder /usr/src/app/postcss.config.js ./postcss.config.js
COPY --from=production-builder /usr/src/app/tailwind.config.js ./tailwind.config.js
COPY --from=production-builder /usr/src/app/package.json ./package.json

CMD ["yarn", "start"]