#!/bin/bash

export NVM_DIR=$HOME/.nvm;
. $NVM_DIR/nvm.sh;

cd /home/ubuntu/fam4christ
git pull origin master
nvm use v16
npm install &&
npm build &&
pm2 restart fam4christ