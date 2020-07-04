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