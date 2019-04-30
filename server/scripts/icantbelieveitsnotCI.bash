#!/bin/bash
./cheapci -r https://github.com/tucosc484/yaw.git \
-l /yaw \
-d server/tests
-c ./test.sh # this will just build the thing
-m patrick.jasinski6800@me.com