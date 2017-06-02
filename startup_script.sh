#!/bin/sh

export NODE_ENV=production
export PATH=/usr/local/bin:$PATH
export PATH=/usr/lib/nodejs/node-v6.10.2/bin:$PATH

forever start /home/pi/inputlist/bin/www > /dev/null
forever start /home/pi/inputlist/lib/cron.js > /dev/null
