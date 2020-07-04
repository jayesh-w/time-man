const isTime = require('./utils/isTime.js');
const _getFormat = require('./utils/getFormat.js');
const addTimeSeconds = require('./addTimeSeconds.js');
const addTimeMinutes = require('./addTimeMinutes.js');

class Time {
    constructor(time,format='H:i:s') {
        this.format = format;
        if(time) {
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
    getTime() {
        return this.time;
    }
    logTime() {
        if(this.time) {
            console.log(this.time);
        }
    }
    addTime(time) {
        if(typeof(time) == 'object') {
            const format = time.getFormat();
            if(format == 'H:i:s') {
                this.time = addTimeSeconds(this.time,time.getTime());
            }
            if(format == 'H:i') {
                this.time = addTimeMinute(this.time,time.getTime());
            }
        }
        else {
            try {
                const format = _getFormat(time);
                if(isTime(time,format)) {
                    if(format != this.format) {
                        throw "Format Doesn't Match!";
                    }
                    else {
                        if(format == 'H:i:s') {
                        this.time = addTimeSeconds(this.time,time);
                        }
                        if(format == 'H:i') {
                            this.time = addTimeMinutes(this.time,time);
                        }
                    }
                }
                else {
                    throw "Invalid Time Provided in argument!";
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        
    }
    subtractTime(time) {
        if(typeof(time) == 'object') {
            const format = time.getFormat();
            if(format == 'H:i:s') {
                this.time = subTimeSeconds(this.time,time.getTime());
            }
            if(format == 'H:i') {
                this.time = subTimeMinute(this.time,time.getTime());
            }
        }
        else {
            try {
                const format = _getFormat(time);
                if(isTime(time,format)) {
                    if(format != this.format) {
                        throw "Format Doesn't Match!";
                    }
                    else {
                        if(format == 'H:i:s') {
                        this.time = subTimeSeconds(this.time,time);
                        }
                        if(format == 'H:i') {
                            this.time = subTimeMinutes(this.time,time);
                        }
                    }
                }
                else {
                    throw "Invalid Time Provided in argument!";
                }
            }
            catch(err) {
                console.log(err);
            }
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