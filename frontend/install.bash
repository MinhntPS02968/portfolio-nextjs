#!/bin/bash
# abort on errors
set -e

#DOMAIN='big-ex.com'
# directory website
#cd /home/kanni/web/${DOMAIN}/public_html/bigex/interface

echo "================> Update new code"
git pull

echo "================> Install modules"
yarn install --ignore-engines

echo "================> Build folder website"
yarn build

echo "================> Chown permissions"
chown -R kanni:kanni /home/kanni/web

echo "================> Delete pm2"
pm2 delete ecosystem.config.js

echo "================> Start pm2"
pm2 start ecosystem.config.js

$SHELL
