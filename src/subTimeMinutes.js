const convert = require('./utils/convert.js');
const deconvert = require('./utils/deconvert.js');
const subTimeMinutes = (t1,t2) => {
    const format = 'H:i';
    let t1_sec = convert(t1,format);
    let t2_sec = convert(t2,format);
    diff = t1_sec - t2_sec;
    console.log(t1_sec,t2_sec)
    console.log(diff);
    while(diff < 0) {
        diff = diff + 1440;
    }
    return deconvert(diff,format);   
}
module.exports = subTimeMinutes;