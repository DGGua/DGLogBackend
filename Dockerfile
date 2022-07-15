FROM node:14
COPY ./ /app
WORKDIR /app
RUN yarn install && yarn build

FROM node:14
RUN mkdir /app
COPY --from=0 /app/build /app
WORKDIR /app
RUN node index.js