SerialPort = require('serialport');
var nmea = require('./index.js');
//var nmea = require('nmea-miniplex');
var net = require('net');

// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//    if ((port.vendorId == 0x0403) && (port.productId == 0xfd4b)) {
//      console.log(port.comName);
//    }
//   });
// });

var nmeadata = {
        };

var MetersToFeet = function(m) {
  if(typeof m !== "number") {
    return "invalid input";
  } else {
    return m * 3.28084;
  }
};

var MetersToFathom = function(m) {
  if(typeof m !== "number") {
    return "invalid input";
  } else {
    return m * 0.546806649;
  }
};

var client = net.connect({port: 10110},
    function() { //'connect' listener
});

//var client = new SerialPort('/dev/ttyMPL', {
//                baudrate: 460800,
//                dataBits: 8,
//                stopBits: 1,
//                parity: 'none',
//                parser: Serialport.parsers.readline('\r\n')});
//                parser: SerialPort.parsers.raw});

client.on('data', function(line) {
  data_last = new Date();
//  console.log(line.toString());
  d = nmea.parse(line.toString());
  if (d) {
    sentence = d.sentence;
    switch(sentence) {
      case 'DPT':
                  nmeadata.depth = d.depth;
                  nmeadata.depth_offset = d.offset;

                  nmeadata.depth_belowsurface = d.depth;
                  nmeadata.depth_belowkeel = d.depth + d.offset;
                  nmeadata.depth_belowtransducer = d.depth + d.offset + 0.3;
                  
                  break;
      default:
//                  console.log(d);
                  break;
    }
  }
});


