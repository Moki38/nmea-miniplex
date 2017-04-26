var nmea = require('./index.js');
//var nmea = require('nmea-miniplex');

//SerialPort = require('serialport');
var net = require('net');

var mbarToInch = function(m) {
  if(typeof m !== "number") {
    return "invalid input";
  } else {
    return m * 0.000295299830714;
  }
};

var options = {
        address: '0x47',
        device: '/dev/i2c-1',
        };
var bmp085 = require('bmp085');
var barometer = new bmp085({address: 0x77, 'device': options.device});

var i2c_htu21d = require('htu21d-i2c');
var htu21d = new i2c_htu21d({address: 0x47, device: '/dev/i2c-1'});

// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//    if ((port.vendorId == 0x0403) && (port.productId == 0xfd4b)) {
//      console.log(port.comName);
//    }
//   });
// });

var nmeadata = { };

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

var read_htu21d = setInterval(function () {
    htu21d.readTemperature(function (temp) {
      nmeadata.temp = Math.floor(temp*10)/10;
    });
    barometer.read(function (data) {
      nmeadata.mbar = Math.floor(data.pressure*10)/10;
    });
    htu21d.readHumidity(function (hum) {
      nmeadata.humidity = Math.floor(hum*10)/10;
    });

    var d = nmea.encode('WI', {type:"meteo", id:"MDA",baro_bar: nmeadata.mbar, baro_inch: mbarToInch(nmeadata.mbar),air_temp: nmeadata.temp, abs_hum: nmeadata.humidity} );
    client.write(d);
}, 3000);

client.on('error', function(ex) {
  console.log("handled error");
  console.log(ex);
});

