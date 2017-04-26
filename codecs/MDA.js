var helpers = require("../helpers.js")
/*
MDA - Meteorological Composite
NMEA 0183 Sentences Not Recommended for New Designs Approved by the NMEA 0183 Standard Committee as of October 1, 2008
Barometric pressure, air and water temperature, humidity, dew point and wind speed and direction relative to the surface of the earth. The use of $--MTW, $--MWV and $--XDR is recommended.
 ------------------------------------------------------------------------------
$--MDA,x.x,I,x.x,B,x.x,C,x.x,C,x.x,x.x,x.x,C,x.x,T,x.x,M,x.x,N,x.x,M*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

1) Barometric pressure, inches of mercury
3) Barometric pressure, bars
5) Air temperature, degrees C
7) Water temperature, degrees C
9) Relative humidity, percent
10) Absolute humidity, percent
11) Dew point, degrees C
Wind direction, degrees True 
Wind direction, degrees Magnetic
Wind speed, knots
Wind speed, meters/second
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
    if (msg.baro_inch) {
      result.push(msg.baro_inch);
      result.push('I');
    } else {
      result.push(',,');
    }

    if (msg.baro_bar) {
      result.push(msg.baro_bar);
      result.push('B');
    } else {
      result.push(',,');
    }
    if (msg.air_temp) {
      result.push(msg.air_temp);
      result.push('C');
    } else {
      result.push(',,');
    }
// Water Temp
    result.push(',C');

    if (msg.rel_hum) {
      result.push(msg.rel_hum);
    } else {
      result.push('');
    }
    if (msg.abs_hum) {
      result.push(msg.abs_hum);
    } else {
      result.push(',');
    }
    result.push(',C,,T,,N,,M');
    var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
}
