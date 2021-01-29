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

let state = 0; //0 to 255 value
let maxTemp = 0;
let temp = 0;

let interval = setInterval(async () => {
    temp = await functions.execute('/opt/vc/bin/vcgencmd measure_temp');
    if (temp!=false) {
        temp = functions.parseTemp(temp);
        if (temp>maxTemp) maxTemp=temp;

        if (temp <= MIN_TEMP)
            state = 0;
        else if (temp >= MAX_TEMP)
            state = 255;
        else {
            state = Math.round((255 / (MAX_TEMP - MIN_TEMP)) * (temp - MIN_TEMP)); 
            if (state<=INITIAL_STATE) state=INITIAL_STATE;
        }
            
        transistor.pwmWrite(state);
        console.log(`+[INFO] Current temp: ${temp}, Pwm value: ${state}, Max temp: ${maxTemp}`);
    }
    else 
        console.log('Failed to catch temperature, please stop this script!');
}, REFLESH_TIME * 1000);


process.on('SIGHUP', () => {
    transistor.pwmWrite(0);
    clearInterval(interval);
    process.exit();
});