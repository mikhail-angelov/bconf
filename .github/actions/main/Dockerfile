
FROM node:12-alpine as runtime

LABEL "com.github.actions.name"="Build and Publish Docker Images to GPR"
LABEL "com.github.actions.description"="Build and Publish Docker Images to the GitHub Package Registry"
LABEL "com.github.actions.icon"="layers"
LABEL "com.github.actions.color"="purple"

RUN apk update \
  && apk upgrade \
  && apk add --no-cache git curl jq docker

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/entrypoint.sh"]