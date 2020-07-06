# Time-man JS 
### A Simple JavaScript Library to manage "Time". 

----
## Installation
#### 1. NPM

```bash
$npm install time-man
```
and then 

```js
const Time = require('time-man');
```

#### 2. Script Tag

```html
<script src="dist/time-man.min.js"></script>

<!-- or ---->

<script src="dist/time-man.js"><script>

```

----
## Usage
1. To declare a time object like Date() in JS.
2. Basic add/subtract,average and more handy functions.

----
### Declare a time object

```js

const object = new Time();

//OR

const object = new Time('23:56:00');

// OR

const object = new Time('23:56:00','H:i:s');

//OR

const object = new Time('23:56','H:i');

```

### log the time


```object.logTime()```

   

----
## Object Methods[object.Method()]

Method | Description
------------ | -------------
string getTime() | Returns a string .
logTime() | Logs the time directly to console.
string addTime([object]) | adds time to current object
string addTime(['00:00:00'],[format])| adds Time to current object
string subTime([object]) | subtracts time from current object
string subTime(['00:00:00'],[format])| subtracts Time from current object
string getFormat() | get the format of time
string getTime_12Hr() | returns 12-Hr format of Time.
string getTimeZone() | returns the Time Zone.

----
## Static Methods [Time.method()]
Method | Description
------------ | -------------
string averageTime([Array of Times) | Returns average of Time.
object TimeSlicer([from time][to time][per Slot time]) | Returns an object of slotted Time.
string UnixTimeStamp() | get the current Unix Time Stamp
string CurrentDate() | get the current Date
string TimeStamp() | get SQL friendly TimeStamp eg 2020-12-12 23:23:23 
string TimeZone() | get Current TimeZone(same as getTimeZone)



----
## People
Author [Jayesh Waghmare](https://github.com/jayesh-w)

----
## License 
[MIT](LICENSE)
