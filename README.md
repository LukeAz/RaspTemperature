## RaspTemperature
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup and run](#setup-and-run)
* [Configuration](#configuration)
* [System service](#service)

## General info
This project allows you to manage the speed of a 5 volt fan on Raspberry Pi.
Through a transistor, and two resistors you can modulate the voltage, using this project the fan will change speed based on the temperature detected by the operating system.

This script uses vsgencmd, firmware present by default on raspberry. In case it is not present you can find the pre compiled on the official repository of raspberry pi (https://github.com/raspberrypi/firmware/tree/master/hardfp/opt/vc).
You must download the vcgencmd file and insert it in '/opt/vc/bin/vcgencmd'.

## Technologies
Project is created with:
* Pigpio C library to enable fast GPIO, PWM
* Pigpio Nodejs library

![PWM Scheme](https://github.com/LukeAz/RaspTemperature/blob/main/img/scheme.png)
This scheme was designed by RikiDema (https://github.com/RikiDema).
	
## Setup and run
To run this project, install it locally:

```
$ sudo apt-get install pigpio
$ git clone https://github.com/LukeAz/RaspTemperature.git
$ cd RaspTemperature
$ npm install
$ nano config.json
$ npm start
```
For more information see: 
* https://github.com/fivdi/pigpio#installation

## Configuration
To customize the script settings you need to edit the 'config.json' file.

```
$ nano config.json
```

Explanation:
* minTemp: minimum temperature in degrees Celsius (the fan will remain off);
* maxTemp: maximum temperature in degrees Celsius (the fan will go to maximum power);
* pinNum: GPIO pin number used for PWM management. Normally pin 17 is used, but you can use pin 12 or 13;
* hertz: the frequency of the PWM, it is strongly recommended to leave 60, but it can be raised or lowered depending on the possible noise of the fan;
* refleshTime: timer in seconds for temperature update, it is recommended to enter a value between 2 and 5 seconds, to avoid abrupt changes in fan speed;
* initialState: value from 0 to 255, allows you to set a minimum starting value of PWM, to be raised in case the fan does not have enough power to start. It is recommended not to enter a value higher than 30.

## Service
In the repository there is an example in the file 'raspTemperatureExample.service' to insert the script into the system services.
It is necessary to edit the working directory within it.

```
$ nano raspTemperatureExample.service
$ cp raspTemperatureExample.service /etc/systemd/system/
$ sudo systemctl enable raspTemperatureExample
$ sudo systemctl start raspTemperatureExample
```
To stop the service:
```
$ sudo systemctl stop raspTemperatureExample
```
To delete the service:
```
$ sudo systemctl disable raspTemperatureExample
$ sudo rm /etc/systemd/system/raspTemperatureExample.service
```
