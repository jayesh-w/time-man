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