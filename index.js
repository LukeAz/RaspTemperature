/*
 * License: MIT
 * LukeAz => https://github.com/LukeAz
*/
let config = require('./config.json');
const MAX_TEMP = config.maxTemp || 50;
const MIN_TEMP = config.minTemp || 30;
const PIN_NUM = config.pinNum || 17;
const HERTZ = config.hertz || 60;
const REFLESH_TIME = config.refleshTime || 2;
const INITIAL_STATE = (config.initialState >=0 && config.initialState <=255) ? config.initialState : 0 || 0; 

const functions = require('./functions');
const transistor = functions.initGpio(PIN_NUM, HERTZ);

let state = 0; 
let maxTemp = 0;
let temp = 0;

let interval = setInterval(() => {
    temp = functions.readTemperature();
    if (temp!=false) {
        if (temp>maxTemp) 
            maxTemp=temp;

        state = (temp <= MIN_TEMP) ? 0 : (temp >= MAX_TEMP) ? 255 :  Math.round((255 / (MAX_TEMP - MIN_TEMP)) * (temp - MIN_TEMP));
        if (state >0 && state <= INITIAL_STATE) 
            state=INITIAL_STATE;  
            
        transistor.pwmWrite(state);
        console.log(`+[INFO] Current temp: ${temp}, Pwm value: ${state}, Max temp: ${maxTemp}`);
    }
    else {
        transistor.pwmWrite(255);
        console.log('Failed to catch temperature, please stop this script!');
    }
}, REFLESH_TIME * 1000);


process.on('SIGHUP', () => {
    transistor.pwmWrite(0);
    clearInterval(interval);
    process.exit();
});
