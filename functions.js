/*
 * License: MIT
 * LukeAz => https://github.com/LukeAz
*/
const fs = require('fs');
const Gpio = require('pigpio').Gpio;

module.exports = {
    initGpio: (PIN_NUM, HERTZ) => {
        let transistor = new Gpio(PIN_NUM, {mode: Gpio.OUTPUT});
        transistor.pwmFrequency(HERTZ);
        return transistor;
    },
    readTemperature: () => {
        let temperature = Number(fs.readFileSync('/sys/class/thermal/thermal_zone0/temp', {encoding:'utf8', flag:'r'}));
        return (isNaN(temperature)) ? false : Math.round(temperature/1000); 
    }
}
