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