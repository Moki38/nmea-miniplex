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
    case 'PSM':
                break;
    case 'RMC':
                break;
    case 'DBT':
                nmeadata.depth = d.depthMetersek;
    case 'HDG':
                nmeadata.heading = d.heading;
                nmeadata.heading = d.heading;
//                console.log('Heading = %d',d.heading);
                break;
    case 'MWV':
                nmeadata.wind_speed = d.speed;
                nmeadata.app_wind_angle = d.angle;
                nmeadata.true_wind_angle = (nmeadata.app_wind_angle + nmeadata.heading) % 360;

                if ((nmeadata.true_wind_angle >= 348.75) && (nmeadata.true_wind_angle < 11.25)) nmeadata.true_wind_dir = 'N';
                if ((nmeadata.true_wind_angle >= 11.25) && (nmeadata.true_wind_angle < 33.75)) nmeadata.true_wind_dir = 'NNE';
                if ((nmeadata.true_wind_angle >= 33.75) && (nmeadata.true_wind_angle < 56.25)) nmeadata.true_wind_dir = 'NE';
                if ((nmeadata.true_wind_angle >= 56.25) && (nmeadata.true_wind_angle < 78.75)) nmeadata.true_wind_dir = 'ENE';
                if ((nmeadata.true_wind_angle >= 78.75) && (nmeadata.true_wind_angle < 101.25)) nmeadata.true_wind_dir = 'E';
                if ((nmeadata.true_wind_angle >= 101.25) && (nmeadata.true_wind_angle < 123.75)) nmeadata.true_wind_dir = 'ESE';
                if ((nmeadata.true_wind_angle >= 123.75) && (nmeadata.true_wind_angle < 146.25)) nmeadata.true_wind_dir = 'SE';
                if ((nmeadata.true_wind_angle >= 146.25) && (nmeadata.true_wind_angle < 168.75)) nmeadata.true_wind_dir = 'SSE';
                if ((nmeadata.true_wind_angle >= 168.75) && (nmeadata.true_wind_angle < 191.25)) nmeadata.true_wind_dir = 'S';
                if ((nmeadata.true_wind_angle >= 191.25) && (nmeadata.true_wind_angle < 213.75)) nmeadata.true_wind_dir = 'SSW';
                if ((nmeadata.true_wind_angle >= 213.75) && (nmeadata.true_wind_angle < 236.25)) nmeadata.true_wind_dir = 'SW';
                if ((nmeadata.true_wind_angle >= 236.25) && (nmeadata.true_wind_angle < 258.75)) nmeadata.true_wind_dir = 'WSW';
                if ((nmeadata.true_wind_angle >= 258.75) && (nmeadata.true_wind_angle < 281.25)) nmeadata.true_wind_dir = 'W';
                if ((nmeadata.true_wind_angle >= 281.25) && (nmeadata.true_wind_angle < 25.75)) nmeadata.true_wind_dir = 'WNW';
                if ((nmeadata.true_wind_angle >= 303.75) && (nmeadata.true_wind_angle < 326.25)) nmeadata.true_wind_dir = 'NW';
                if ((nmeadata.true_wind_angle >= 326.25) && (nmeadata.true_wind_angle < 348.75)) nmeadata.true_wind_dir = 'NNW';

//                console.log('Wind Speed = %d',d.speed);
//                console.log('Wind Angle = %d',d.angle);
                break;
    case 'MTW':
//                console.log('Water Temp = %d',d.degrees);
                break;
    case 'VHW':
                nmeadata.speed = d.speed_n;
//                console.log('Speed Knots = %d',d.speed_n);
                break;
    case 'TXT':
                break;
    case 'VDM':
                break;
    case 'VDO':
                break;
    case 'GBS':
                break;
    default:
                console.log(d);
                break;
  }
  }
});


