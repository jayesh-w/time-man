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