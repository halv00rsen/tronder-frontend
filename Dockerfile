# build environment
FROM node:12.2.0-alpine as build

ARG AWS_ACCESS_KEY_ID=empty
ARG AWS_SECRET_ACCESS_KEY=empty

WORKDIR /src
ENV PATH /src/node_modules/.bin:$PATH

RUN mkdir ~/.aws
RUN touch ~/.aws/config
RUN echo "[default]" > ~/.aws/config
RUN echo "region = eu-west-1" >> ~/.aws/config

RUN touch ~/.aws/credentials
RUN echo "[default]" > ~/.aws/credentials
RUN echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> ~/.aws/credentials
RUN echo "aws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials

COPY package.json /src/package.json
COPY amplify-init.sh /src/amplify-init.sh
COPY . /src

RUN npm install -g @aws-amplify/cli --silent
RUN source amplify-init.sh
RUN mv /src/aws-exports.js /src/aws-exports.ts

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /src/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
