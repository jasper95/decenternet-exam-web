  
# set the base image
# n/b: for production, node is only used for building 
# the static Html and javascript files
# as react creates static html and js files after build
# these are what will be served by nginx
# use alias build to be easier to refer this container elsewhere
# e.g inside nginx container
FROM node:10.15-alpine as build
# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
# as opposed to on dev, in prod everything is copied to docker
COPY . /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn config set network-timeout 300000

# install and cache dependencies
RUN yarn

ARG REACT_APP_API_USERNAME
ENV REACT_APP_API_USERNAME $REACT_APP_API_USERNAME

ARG API_URL
ENV API_URL $API_URL

ARG REACT_APP_API_PASSWORD
ENV REACT_APP_API_PASSWORD $REACT_APP_API_PASSWORD

ARG CAPTCHA_KEY
ENV CAPTCHA_KEY $CAPTCHA_KEY

ARG STATIC_URL
ENV STATIC_URL $STATIC_URL

ARG GEOSERVER_URL
ENV GEOSERVER_URL $GEOSERVER_URL


#build the project for production
RUN yarn build:client
# set up production environment
# the base image for this is an alpine based nginx image
FROM nginx:alpine
# copy the build folder from react to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx/docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]