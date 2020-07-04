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
