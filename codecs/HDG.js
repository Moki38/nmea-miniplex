var helpers = require("../helpers.js")
/*
 === HDG - Heading - Deviation & Variation ===

 ------------------------------------------------------------------------------
 *******1   2   3 4   5 6
 *******|   |   | |   | |
 $--HDG,x.x,x.x,a,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

1) Magnetic Sensor heading in degrees
2) Magnetic Deviation, degrees
3) Magnetic Deviation direction, E = Easterly, W = Westerly
4) Magnetic Variation degrees
5) Magnetic Variation direction, E = Easterly, W = Westerly
6) Checksum
*/

exports.TYPE = 'heading';
exports.ID = 'HDG';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    heading: +fields[1],
    mag_dev_deg: fields[2],
    mag_dev_dir: +fields[3],
    mag_var_deg: fields[4],
    mag_var_dir: fields[5]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeDegrees(msg.angle));
  result.push(msg.reference);
  result.push(helpers.encodeFixed(msg.speed, 2));
  result.push(msg.units);
  result.push(typeof msg.status === undefined ? 'A' : msg.status);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
