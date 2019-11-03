# build environment
FROM node:12.2.0-alpine as build
WORKDIR /src
ENV PATH /src/node_modules/.bin:$PATH
COPY package.json /src/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /src
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /src/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
