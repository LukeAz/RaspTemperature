## RaspTemperature
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup and run](#setup)

## General info
This project allows you to manage the speed of a 5 volt fan on Raspberry Pi.
Through a transistor, and two resistors you can modulate the voltage, using this project the fan will change speed based on the temperature detected by the operating system.

This script uses vsgencmd, firmware present by default on raspberry. In case it is not present you can find the pre compiled on the official repository of raspberry pi (https://github.com/raspberrypi/firmware/tree/master/hardfp/opt/vc).
You must download the vcgencmd file and insert it in '/opt/vc/bin/vcgencmd'.

## Technologies
Project is created with:
* Pigpio C library to enable fast GPIO, PWM
* Pigpio Nodejs library
	
## Setup and run
To run this project, install it locally:

```
$ sudo apt-get install pigpio
$ git clone https://github.com/LukeAz/my_package.git
$ cd RaspTemperature
$ npm install
$ npm start
```
For more information see: 
* https://github.com/fivdi/pigpio#installation
