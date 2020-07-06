const isTime = require('./utils/isTime.js');
const _getFormat = require('./utils/getFormat.js');
const addTimeSeconds = require('./addTimeSeconds.js');
const addTimeMinutes = require('./addTimeMinutes.js');
const subTimeSeconds = require('./subTimeSeconds.js');
const subTimeMinutes = require('./subTimeMinutes.js');
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert.js');
const timeZones = require('./utils/timeZones.js');
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
    getTime_12Hr() {
      const time = this.time.split(':');
      let suffix = 'AM';
      let hour = time[0];
      if(hour > 12) {
        hour = hour - 12;
        suffix = 'PM';
      }
      if(hour == 12) suffix = 'PM';
      if(hour < 10) hour = '0'+hour;
      if(this.format == 'H:i:s') {
        return hour+':'+time[1]+':'+time[2]+ " "+suffix;
      }
      else {
        return hour+':'+time[1]+ " "+suffix;
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

    getTimeZone() {
      const TimeZoneOffset = new Date().getTimezoneOffset();
      const TimeZone_fixed = deconvert(Math.abs(TimeZoneOffset),'H:i');
      let timezone = "";
      for(let tz of timeZones) {
        if((-TimeZoneOffset/60) == tz.value) {
          timezone = tz.text;
        }
      }
      if(timezone == "") {
        let suffix = '';
        if(TimeZoneOffset < 0) suffix = '+';
        else suffix = '-';
        timezone = 'GMT/UTC'+suffix+TimeZone_fixed+'city not found!';
      }
      return timezone;
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

/////////////////////////////STATIC METHODS //////////////////////////////////////
    static averageTime(time_array) {
        let sum = 0;
        let offset = 0;
        for(let time of time_array) {
            let format = _getFormat(time);
            if(format == 'H:i') time = time+':00';
            if(isTime(time,'H:i:s')) {
                sum = convert(time,'H:i:s') + sum;
            }
            else {
                offset++;
            }
        }
        const average = Math.floor(sum/(time_array.length - offset));
        return deconvert(average,'H:i:s');
    }

    static UnixTimeStamp() {
      return new Date().getTime();
    }

    static CurrentDate(sep="/") {
      function addZero(value) {
          if(value < 10) return '0'+value;
          else return value;
      }
      const d = new Date();
      let date = addZero(d.getDate());
      let month = addZero(d.getMonth());
      let year = addZero(d.getFullYear());
      return year+sep+month+sep+date;
    }
    static TimeStamp() {
      function addZero(value) {
          if(value < 10) return '0'+value;
          else return value;
      }
      let date = this.CurrentDate('-');
      const d = new Date();
      let hour = addZero(d.getHours());
      let minute = addZero(d.getMinutes());
      let second = addZero(d.getSeconds());
      let time = hour+':'+minute+':'+second;
      return date+" "+time;
    }


    static TimeSlice(from_time,to_time,per_slot_time) {
      const format = 'H:i:s';
      try {
        if(isTime(from_time,format) && isTime(to_time,format) && isTime(per_slot_time,format)) {
          if(_getFormat(from_time) == format && _getFormat(to_time) == format && _getFormat(per_slot_time) == format) {
            let from = convert(from_time,format);
            let to = convert(to_time,format);
            let per = convert(per_slot_time,format);
            const slots = {
              from:from_time,
              to:to_time,
              per_slot:per_slot_time,
              slot:[]
            }
            let n = 0;
            while(from <= to) {
              if(from+per > to) break;
              let  slt = {from:deconvert(from,format),to:deconvert(from+per,format)}
              n++;
              from = from + per;
              slots.slot.push(slt);
            }
            slots.number_of_slots = n;
            return slots;
          }else throw "One or more arguments doesnt match format(H:i:s)"

        }else throw "One or more Arguments is not a valid Time!";
      }
      catch(err) {
        console.log(err);
      }
    }

    static TimeZone() {
      const TimeZoneOffset = new Date().getTimezoneOffset();
      const TimeZone_fixed = deconvert(Math.abs(TimeZoneOffset),'H:i');
      let timezone = "";
      for(let tz of timeZones) {
        if((-TimeZoneOffset/60) == tz.value) {
          timezone = tz.text;
        }
      }
      if(timezone == "") {
        let suffix = '';
        if(TimeZoneOffset < 0) suffix = '+';
        else suffix = '-';
        timezone = 'GMT/UTC'+suffix+TimeZone_fixed+'city not found!';
      }
      return timezone;
    }





}
module.exports = require('./averageTime.js');
module.exports = Time;
