## WORKING CODE, BUT NEEDS WORK. (As in, it works... but needs love)

# NMEA Miniplex3-N2K

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

## Links
http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf
https://www.nmea.org/Assets/100108_nmea_0183_sentences_not_recommended_for_new_designs.pdf
http://www.shipmodul.nl/downloads/manuals/MiniPlex-3_EN.pdf
