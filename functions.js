/*
 * License: MIT
 * LukeAz => https://github.com/LukeAz
*/
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Gpio = require('pigpio').Gpio;

module.exports = {
    initGpio: (PIN_NUM, HERTZ) => {
        let transistor = new Gpio(PIN_NUM, {mode: Gpio.OUTPUT});
        transistor.pwmFrequency(HERTZ);
        return transistor;
    },
    execute: async (command) => {
        let { stdout, stderr } = await exec(command);
        return stderr ? false : stdout
    },
    parseTemp: (data) => {
        return data.substr(data.indexOf('=')+1, 4);
    }
}