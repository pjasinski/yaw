#!/bin/bash
cd /yaw 
npm install
cd /yaw/yaw
npm install
ng build --prod
cp -r dist/* /srv/http
cd /yaw/yaw/server
npm install 
cd /yaw/yaw/server/src
tsc app.ts datastore.ts
killall node app.js
node app.js & 

