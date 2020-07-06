# Time-man JS 
### A Simple JavaScript Library to manage "Time". 

----
## Installation
####1. NPM

```
$npm install time-man
```

####2. Script Tag

```
<script src=""></script>
```

----
## Usage
1. To declare a time object like Date() in JS.
2. Basic add/subtract,average and more handy functions.

----
###Declare a time object

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
object TimeSlot([from time][to time][number of slots]) | Returns an object of slotted Time.


----
## People
Author Jayesh Waghmare

----
##License 
MIT
