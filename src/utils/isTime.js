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