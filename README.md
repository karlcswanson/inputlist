# Input List
A network multi tool for live sound applications

## Installation Notes
* Redirect port 80 to port 3000 for node
Add the following to `/etc/rc.local`
`iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`

* User crontab - Scan every 5 minutes, Start node server at boot

```
*/5 * * * * /home/pi/sdr/scan_wwb.sh >/dev/null 2>&1                    
@reboot /home/pi/inputlist/node_server_init.sh
```

