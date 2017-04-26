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

                  var d = nmea.encode('SD', {type:"depth", id:"DBT", depthFeet: MetersToFeet(nmeadata.depth_belowtransducer), depthMeters: nmeadata.depth_belowtransducer, depthFathoms: MetersToFathom(nmeadata.depth_belowtransducer)} );
                  client.write(d);
                  var d = nmea.encode('SD', {type:"depth", id:"DBK", depthFeet: MetersToFeet(nmeadata.depth_belowkeel), depthMeters: nmeadata.depth_belowkeel, depthFathoms: MetersToFathom(nmeadata.depth_belowkeel)} );
                  client.write(d);
                  var d = nmea.encode('SD', {type:"depth", id:"DBS", depthFeet: MetersToFeet(nmeadata.depth_belowsurface), depthMeters: nmeadata.depth_belowsurface, depthFathoms: MetersToFathom(nmeadata.depth_belowsurface)} );
                  client.write(d);
                  break;
      default:
//                  console.log(d);
                  break;
    }
  }
});


