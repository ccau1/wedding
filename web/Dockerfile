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

RUN yarn i --only=prod

COPY . .

RUN yarn build

FROM node:12.17-alpine as production

WORKDIR /usr/src/app

COPY --from=production-builder /usr/src/app/node_modules ./node_modules
COPY --from=production-builder /usr/src/app/public ./public
COPY --from=production-builder /usr/src/app/.next ./.next
COPY --from=production-builder /usr/src/app/package.json ./package.json

CMD ["yarn", "start"]