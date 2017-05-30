# Input List
Input List is a network multi tool for live sound applications.  

## Modules
* Input List - Provide an input list to band members.
* Frequency Scanner - Scan the UHF band and generate a [Shure Wireless Workbench](http://www.shure.com/americas/products/software/wireless-workbench/wireless-workbench-6) compatible CSV file.
* Network Monitor - Monitor switches, mixers, and other production network devices.

## Installation
* Install [node.js](https://nodejs.org).  Check out the installation  instructions for your platform on the node.js [download site](https://nodejs.org/en/download/).
* Install [RTL-SDR](http://osmocom.org/projects/sdr/wiki/rtl-sdr) tools

```
sudo apt-get update
sudo apt-get install rtl-sdr
```

* Redirect port 80 to port 3000 for node
Add the following to `/etc/rc.local`
`iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`

* Download Input List ```$ git clone https://github.com/karlcswanson/inputlist.git```

* Edit user crontab `$ crontab -e`
```
* * * * * /usr/lib/nodejs/node-v6.10.2/bin/node /home/pi/inputlist/lib/ping.js 2>&1
*/5 * * * * /usr/lib/nodejs/node-v6.10.2/bin/node /home/pi/inputlist/lib/sdr.js 2>&1
@reboot /home/pi/inputlist/node_server_init.sh
```

## Network Configuration
* Reserve an IP address
* Make a custom DNS entry


## Hardware
This app is a simple node.js app.  It can run on a $35 [Raspberry Pi](http://amzn.to/2qwdky5) or a $350 [Intel NUC](http://amzn.to/2qABmY5).


### RTL-SDR Dongles
* [RTL-SDR Blog R820T2 RTL2832U 1PPM TCXO SMA Software Defined Radio Dongle](http://amzn.to/2qvKjCY)
* [NooElec NESDR Nano 2+ Tiny Black RTL-SDR USB Set (RTL2832U + R820T2) with Ultra-Low Phase Noise 0.5PPM TCXO, MCX Antenna & Remote Control](http://amzn.to/2qvQarO)
