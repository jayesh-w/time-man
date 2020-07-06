'use strict'
module.exports = require('./src/time-man-core.js');
if(typeof window !== 'undefined') {
  const Time = require('./src/time-man-core.js');
  window.Time = Time;
}
