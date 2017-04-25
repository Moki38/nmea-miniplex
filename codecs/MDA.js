var helpers = require("../helpers.js")
/*
MDA - Meteorological Composite
NMEA 0183 Sentences Not Recommended for New Designs Approved by the NMEA 0183 Standard Committee as of October 1, 2008
Barometric pressure, air and water temperature, humidity, dew point and wind speed and direction relative to the surface of the earth. The use of $--MTW, $--MWV and $--XDR is recommended.
Wind speed, meters/second
Wind speed, knots
Wind direction, degrees Magnetic
Wind direction, degrees True $--MDA,x.x,I,x.x,B,x.x,C,x.x,C,x.x,x.x,x.x,C,x.x,T,x.x,M,x.x,N,x.x,M*hh<CR><LF>
Dew point, degrees C
Absolute humidity, percent
Relative humidity, percent
Water temperature, degrees C
Air temperature, degrees C
Barometric pressure, bars
Barometric pressure, inches of mercury

 ------------------------------------------------------------------------------
 *******1   2 3 
 *******|   | |
 $--MTA,x.x,C*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

1) Temperature
2) Type
3) Checksum
*/

exports.TYPE = 'meteo';
exports.ID = 'MDA';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    baro_inch: fields[1],
    baro_bar: fields[3],
    air_temp: fields[5],
    water_temp: fields[7],
    rel_hum: fields[9],
    abs_hum: fields[10],
    dew_pnt: fields[11]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(msg.baro_inch);
  result.push('I');
  result.push(msg.baro_bar);
  result.push('B');
  result.push(msg.air_temp);
  result.push('C');
  result.push(',,,,,,,,,,,,,,');
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
