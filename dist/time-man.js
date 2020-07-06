(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'
module.exports = require('./src/time-man-core.js');
if(typeof window !== 'undefined') {
  const Time = require('./src/time-man-core.js');
  window.Time = Time;
}

},{"./src/time-man-core.js":7}],2:[function(require,module,exports){
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert.js');

const addTimeMinutes = (t1,t2) => {
    const format = 'H:i';
    let t1_min = convert(t1,format);
    let t2_min = convert(t2,format);
    sum = t1_min + t2_min;
    while(sum >= 1440) {
        sum = sum -1440;
    }
    return deconvert(sum,format);
    
}

module.exports = addTimeMinutes;
},{"./utils/convert.js":8,"./utils/deconvert.js":9}],3:[function(require,module,exports){
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert.js');
const addTimeSeconds = (t1,t2) => {
    const format = 'H:i:s';
    let t1_sec = convert(t1,format);
    let t2_sec = convert(t2,format);
    sum = t1_sec + t2_sec;
    while(sum >= 86400) {
        sum = sum - 86400;
    }
    return deconvert(sum,format);   
}
module.exports = addTimeSeconds;

},{"./utils/convert.js":8,"./utils/deconvert.js":9}],4:[function(require,module,exports){
const getFormat = require('./utils/getFormat.js');
const isTime = require('./utils/isTime.js');
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert');
const averageTime = (time_array) => {
    let sum = 0;
    let offset = 0;
    for(var time of time_array) {
        format = getFormat(time);
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
module.exports = averageTime;

},{"./utils/convert.js":8,"./utils/deconvert":9,"./utils/getFormat.js":10,"./utils/isTime.js":11}],5:[function(require,module,exports){
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert.js');
const subTimeMinutes = (t1,t2) => {
    const format = 'H:i';
    let t1_sec = convert(t1,format);
    let t2_sec = convert(t2,format);
    diff = t1_sec - t2_sec;
    while(diff < 0) {
        diff = diff + 1440;
    }
    return deconvert(diff,format);
}
module.exports = subTimeMinutes;

},{"./utils/convert.js":8,"./utils/deconvert.js":9}],6:[function(require,module,exports){
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert.js');
const subTimeSeconds = (t1,t2) => {
    const format = 'H:i:s';
    let t1_sec = convert(t1,format);
    let t2_sec = convert(t2,format);
    diff = t1_sec - t2_sec;
    while(diff < 0) {
        diff = diff + 86400;
    }
    return deconvert(diff,format);
}
module.exports = subTimeSeconds;

},{"./utils/convert.js":8,"./utils/deconvert.js":9}],7:[function(require,module,exports){
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

},{"./addTimeMinutes.js":2,"./addTimeSeconds.js":3,"./averageTime.js":4,"./subTimeMinutes.js":5,"./subTimeSeconds.js":6,"./utils/convert.js":8,"./utils/deconvert.js":9,"./utils/getFormat.js":10,"./utils/isTime.js":11,"./utils/timeZones.js":12}],8:[function(require,module,exports){
const convert = (time,format) => {
    if(format == 'H:i') {
        time_minute = parseInt(time.substring(0,2))*60 + parseInt(time.substring(3,5));
        return time_minute;
    }
    if(format == 'H:i:s') {
        time_second = parseInt(time.substring(0,2))*60*60 + parseInt(time.substring(3,5))*60 + parseInt(time.substring(6,8));
        return time_second;
    }
}

module.exports = convert; // 00:00:00
},{}],9:[function(require,module,exports){
const deconvert = (time,format) => {
    if(format == 'H:i') {
        hours = Math.floor(time/60);
        minutes = time%60;
        if(hours < 10) hours = '0'+hours;
        if(minutes < 10) minutes = '0'+minutes;
        return hours+':'+minutes;
        
    }
    if(format == 'H:i:s') {
        hours = Math.floor(time/3600);
        minutes = Math.floor(time/60)%60;
        seconds = time%60;
        if(hours < 10) hours = '0'+hours;
        if(minutes < 10) minutes = '0'+minutes;
        if(seconds < 10) seconds = '0'+seconds;
   
        return hours+':'+minutes+':'+seconds;
    }
}

module.exports = deconvert; // 00:00:00
},{}],10:[function(require,module,exports){
const isTime = require('./isTime.js');
const getFormat = (time) => {
    try {
        if(time.length == 5 || time.length == 8) {
            if(time.length == 5) {
                if(isTime(time,'H:i') && time[2] == ':') {
                    return 'H:i';
                }
                else {
                    throw "Not a valid Time!(valid format : 00:00)";
                }
            }
            if(time.length == 8) {
                if(isTime(time,'H:i:s') && time[2] == ':' && time[5] == ':') {
                    return 'H:i:s';
                }
                else {
                    throw "Not a valid Time!(valid format : 00:00:00)";
                }
            }
        } else {
            throw "Check Time Provided!";
        }   
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = getFormat;
},{"./isTime.js":11}],11:[function(require,module,exports){
const isTime = (time,format) => {
    validformat = ['H:i:s','H:i'];
    if(validformat.includes(format)) {
        try {
            const convert = require('./convert.js');
            if(convert(time,format) < 1440 && format == 'H:i') {
                return true;
            }
            if(convert(time,format) < 86400 && format == 'H:i:s') {
                return true;
            }
            else {
                throw "NotTime: The Given String is not a valid Time!(check values)";
            }
            
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else {
        try {
            throw "FormatError: Not a valid Format!";
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = isTime;
},{"./convert.js":8}],12:[function(require,module,exports){
const timeZone =
  [
   {
      value: -12,
      text: "(GMT -12:00) Eniwetok, Kwajalein"
   },
   {
      value: -11,
      text: "(GMT -11:00) Midway Island, Samoa"
   },
   {
      value: -10,
      text: "(GMT -10:00) Hawaii"
   },
   {
      value: -9,
      text: "(GMT -09:00) Alaska"
   },
   {
      value: -8,
      text: "(GMT -08:00) Pacific Time (US & Canada)"
   },
   {
      value: -7,
      text: "(GMT -07:00) Mountain Time (US & Canada)"
   },
   {
      value: -6,
      text: "(GMT -06:00) Central Time (US & Canada), Mexico City"
   },
   {
      value: -5,
      text: "(GMT -05:00) Eastern Time (US & Canada), Bogota, Lima"
   },
   {
      value: -4,
      text: "(GMT -04:00) Atlantic Time (Canada), Caracas, La Paz"
   },
   {
      value: -3.5,
      text: "(GMT -03:30) Newfoundland"
   },
   {
      value: -3,
      text: "(GMT -03:00) Brazil, Buenos Aires, Georgetown"
   },
   {
      value: -2,
      text: "(GMT -02:00) Mid-Atlantic"
   },
   {
      value: -1,
      text: "(GMT -01:00) Azores, Cape Verde Islands"
   },
   {
      value: 0,
      text: "(GMT) Western Europe Time, London, Lisbon, Casablanca"
   },
   {
      value: 1,
      text: "(GMT +01:00) Brussels, Copenhagen, Madrid, Paris"
   },
   {
      value: 2,
      text: "(GMT +02:00) Kaliningrad, South Africa"
   },
   {
      value: 3,
      text: "(GMT +03:00) Baghdad, Riyadh, Moscow, St. Petersburg"
   },
   {
      value: 3.5,
      text: "(GMT +03:30) Tehran"
   },
   {
      value: 4,
      text: "(GMT +04:00) Abu Dhabi, Muscat, Baku, Tbilisi"
   },
   {
      value: 4.5,
      text: "(GMT +04:30) Kabul"
   },
   {
      value: 5,
      text: "(GMT +05:00) Ekaterinburg, Islamabad, Karachi, Tashkent"
   },
   {
      value: 5.5,
      text: "(GMT +05:30) Mumbai, Kolkata, Chennai, New Delhi"
   },
   {
      value: 5.75,
      text: "(GMT +05:45) Kathmandu"
   },
   {
      value: 6,
      text: "(GMT +06:00) Almaty, Dhaka, Colombo"
   },
   {
      value: 7,
      text: "(GMT +07:00) Bangkok, Hanoi, Jakarta"
   },
   {
      value: 8,
      text: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"
   },
   {
      value: 9,
      text: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
   },
   {
      value: 9.5,
      text: "(GMT +9:30) Adelaide, Darwin"
   },
   {
      value: 10,
      text: "(GMT +10:00) Eastern Australia, Guam, Vladivostok"
   },
   {
      value: 11,
      text: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia"
   },
   {
      value: 12,
      text: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"
   }
];
module.exports = timeZone;

},{}]},{},[1]);
