var helpers = require("../helpers.js")
/*
 === TXT - AIS Text (unknown) ===

 ------------------------------------------------------------------------------
 *******1 
 *******|  
 $--TXT,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Text
 2. Checksum
 */
exports.TYPE = 'ais';
exports.ID = 'TXT';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    text: +fields[1],
  }
}

exports.encode = function(talker, msg) {
 var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeDegrees(msg.text));
  var resultMsg = result.join(',');
 return resultMsg + helpers.computeChecksum(resultMsg);
}
