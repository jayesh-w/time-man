const isTime = require('./utils/isTime');

class Time {
    constructor(time,format='H:i:s') {
        if(time) {
            this.format = format;
            if(isTime(time,format)) {
                this.time = time;
            }
        }
        else {
            function addZero(value) {
                if(value < 10) {
                    return '0'+value;
                }
                else {
                    return value;
                }
            }
            const d = new Date();
            let hour = addZero(d.getHours());
            let minute = addZero(d.getMinutes());
            let second = addZero(d.getSeconds());
            this.time = hour+':'+minute+':'+second;
        }
    }
    getFormat() {
        if(this.format) {
            return this.format;
        }
    }
    logTime() {
        if(this.time) {
            console.log(this.time);
        }
    }

    static functions() {
        const functions = {
            Time: 'Declare a Time variable with format H:i or h:i',
            logTime: 'Logs the time',
            addTime: 'addTime(object) adds two times'
        }
        console.log('Function : Description')
        for (let [key, value] of Object.entries(functions)) {
            console.log(`${key}: ${value}`);
          }
    }
}

module.exports = Time;