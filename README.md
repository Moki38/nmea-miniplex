## WORKING CODE, BUT NEEDS WORK. (As in, it works... but needs love)

# index.js 

Decode NMEA-0183 messages from the Miniplex3-N2K.

### Example code for

Encode DPT, into DBK,DBS,DBT.
Insert Huminity,Temperature from htu21d-i2c

### Install

```
$ npm install nmea-miniplex
```

### Usage
```
var nmea = require('nmea-miniplex');
console.log(nmea.parse(line));
```

## Acknowledgements
This module was based on the NPM [nmea](https://www.npmjs.com/package/nmea)

