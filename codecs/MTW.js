var helpers = require("../helpers.js")
/*
 === MTW - Water Temperatur  ===

 ------------------------------------------------------------------------------
 *******1   2 3 
 *******|   | |   
 $--MWV,x.x,C*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Degrees
 2. Unit of Measurement, Celcius
 3. Checksum
 */
exports.TYPE = 'water';
exports.ID = 'MTW';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    degrees: +fields[1],
    unit: fields[2]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeDegrees(msg.angle));
  result.push(msg.reference);
  result.push(helpers.encodeFixed(msg.degrees, 2));
  result.push(msg.unit);
  result.push(typeof msg.status === undefined ? 'A' : msg.status);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
