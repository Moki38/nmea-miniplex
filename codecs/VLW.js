var helpers = require("../helpers.js")
/*
 === VLW - trip and total Mn logs ===

 ------------------------------------------------------------------------------
 *******1     2 3      4 5 
 *******|     | |      | |
 $--VLW,xxx.x,N,xxxx.x,N*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Trip miles
 2. N 
 3. Total miles
 4. N
 5. Checksum
 */
exports.TYPE = 'log';
exports.ID = 'VLW';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    trip_log: +fields[1],
    trip_log_type: fields[2],
    total_log: +fields[3],
    total_log_type: fields[4],
    status: fields[5]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeDegrees(msg.trip_log));
  result.push(msg.reference);
  result.push(helpers.encodeFixed(msg.total_log, 2));
  result.push(msg.units);
  result.push(typeof msg.status === undefined ? 'A' : msg.status);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
