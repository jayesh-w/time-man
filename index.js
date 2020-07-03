const Time = require('./src/time-man-core.js');
t1 = new Time();
t1.logTime();
t2 = new Time('23:56:00');
t2.logTime();
console.log(t2.getFormat());

