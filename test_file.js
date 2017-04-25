//var nmea = require('nmea-miniplex')
var nmea = require('./index.js')
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('nmea.out')
});

lineReader.on('line', function (line) {
  console.log(nmea.parse(line));
});

