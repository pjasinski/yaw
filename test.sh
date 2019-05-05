#!/bin/bash
SYSTEMD_DIR=/usr/lib/systemd/system/
## copy system.d servicces
cp -r services/ $SYSTEMD_DIR
systemctl daemon-reload
## dump1090
systemctl restart dump1090

## importer services

## Yaw Client
cd /home/pjasinski/yaw # enter source directory
cd yaw
ng build --prod
cp -r dist/yaw /srv/http/

## Express server
cd ../server
cp scripts/jsonscript.js /srv/scripts/
cd src
tsc *.ts
node app.js &
## RESTART SYSTEMD SERVICE

## Socket 


