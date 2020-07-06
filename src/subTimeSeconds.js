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
