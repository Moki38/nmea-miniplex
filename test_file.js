//var nmea = require('nmea-miniplex')
var nmea = require('./index.js')
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('nmea.out')
});

lineReader.on('line', function (line) {
  d = nmea.parse(line.toString());
  if (d) {
    sentence = d.sentence;
    switch(sentence) {
      case 'DPT':
                console.log("Depth: "+line);
                console.log(d);
                break;
      case 'ZDA':
                console.log("ZDA: "+line);
                break;
    }
//    console.log(d);
  }
});

