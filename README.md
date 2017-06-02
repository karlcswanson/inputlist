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

* The app listens on port 3000 by default.  Add this firewall rule to redirect requests at port 80 to 3000.  If you are interested in other ways of doing this, check out this [post](https://eladnava.com/binding-nodejs-port-80-using-nginx/).
Add the following to `/etc/rc.local`
  ```
  iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
  ```

* Download and install Input List
  ```
  $ git clone https://github.com/karlcswanson/inputlist.git
  $ cd inputlist/
  $ npm install
  ```

* Edit user crontab `$ crontab -e`
  ```
  @reboot /home/pi/inputlist/startup_script.sh 2>&1
  ```

## Configuration
There are 3 configuration files in the `/config` directory

### rtl.json
Set the lower and upper frequencies for the scanner.
```
{
    "lower_frequency": "656M",
    "upper_frequency" : "692M",
    "bin_size": "25k",
    "integration_level" : "5M"
}
```

### inputlist.json
Set the input list.
```
[
  {
    "channel": 1,
    "description": "Eric VOX",
    "short name" : "EH",
    "mute group": 1,
    "DCA": "VOX",
    "color": "Cyan",
    "icon": "Dynamic",
    "phantom": false,
    "st link": false,
    "aviom input": 1
  },
  {
    "channel": 2,
    "description": "Kirsten VOX",
    "short name" : "KG",
    "mute group": 1,
    "DCA": "VOX",
    "color": "Cyan",
    "icon": "Dynamic",
    "phantom": false,
    "st link": false,
    "aviom input": 2
  },
  {
    "channel": 3,
    "description": "Sam VOX",
    "short name" : "SA",
    "mute group": 1,
    "DCA": "VOX",
    "color": "Cyan",
    "icon": "Dynamic",
    "phantom": false,
    "st link": false,
    "aviom input": 3
  }
]
```

### hostlist.json
```
[
  {
    "host": "192.168.70.1",
    "name": "PFSense Router",
    "URL": "https://airlock.production/"
  },
  {
    "host": "192.168.70.15",
    "name": "QL5"
  },
  {
    "host": "iem.switch",
    "name": "IEM Switch",
    "URL": "http://iem.switch/"
  },
  {
    "host": "foh.switch",
    "name": "FOH Switch",
    "URL": "https://foh.switch/"
  }
]
```
