const getFormat = require('./utils/getFormat.js');
const isTime = require('./utils/isTime.js');
const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert');
const averageTime = (time_array) => {
    let sum = 0;
    let offset = 0;
    for(time of time_array) {
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