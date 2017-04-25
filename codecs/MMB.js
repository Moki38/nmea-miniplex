var helpers = require("../helpers.js")
/*
 === MMB - Barometer ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5
 *******|   | |   | |
 $--MMB,x.x,I,x.x,B*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

1) Barometric pressure, inches of mercury
2) Inch
3) Barometric pressure, bars
4) Bar
5) Checksum
*/

exports.TYPE = 'pressure';
exports.ID = 'MMB';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    inch: +fields[1],
    inch_type: fields[2],
    bar: +fields[3],
    bar_type: fields[4],
    status: fields[5]
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(msg.inch);
  result.push(msg.inch_type);
  result.push(msg.bar);
  result.push(msg.bar_type);
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
