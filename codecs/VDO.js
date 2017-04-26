var helpers = require("../helpers.js")

/*
 === VDO - Depth below transducer ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5   6 7
 *******|   | |   | |   | |
 $--VDO,x.x,f,x.x,M,x.x,F*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Depth, feet
 2. f = feet
 3. Depth, meters
 4. M = meters
 5. Depth, Fathoms
 6. F = Fathoms
 7. Checksum
 */

exports.TYPE = 'AIS-Data';
exports.ID = 'VDO';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    data: fields[3]
  }
}
