var helpers = require("../helpers.js")
/*
 === MTA - Air Temperature ===

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

exports.TYPE = 'airtemp';
exports.ID = 'MTA';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    temp: +fields[1],
    temp_type: fields[2],
    status: fields[3]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(msg.temp);
  result.push(msg.temp_type);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
