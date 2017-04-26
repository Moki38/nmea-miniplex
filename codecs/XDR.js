var helpers = require("../helpers.js")
/*
 === XD	 - Air Temperature ===

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

exports.TYPE = 'Sensor';
exports.ID = 'XDR';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    sensor_type: +fields[1],
    sensor_value: fields[2],
    sensor_id: fields[3],
    sensor_name: fields[4]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(msg.sensor_type);
  result.push(msg.sensor_value);
  result.push(msg.sensor_id);
  result.push(msg.sensor_name);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
