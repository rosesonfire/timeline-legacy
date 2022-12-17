#/bin/bash

set -x
set -e

docker-compose up -d --build

cd front-end

yarn start