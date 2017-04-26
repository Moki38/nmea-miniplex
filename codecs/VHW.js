var helpers = require("../helpers.js")
/*
 === VHW - Water Speed and Heading ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5   6 7   8 9
 *******|   | |   | |   | |   | |
 $--VHW,x.x,T,x.x,M,x.x,N,x.x,K*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Degress True
 2. T = True
 3. Degrees Magnetic
 4. M = Magnetic
 5. Knots (speed of vessel relative to the water)
 6. N = Knots
 7. Kilometers (speed of vessel relative to the water)
 8. K = Kilometres
 9. Checksum
 */
exports.TYPE = 'speed';
exports.ID = 'VHW';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    degress_true: +fields[1],
    degress_true_type: fields[2],
    degress_mag: +fields[3],
    degress_mag_type: fields[4],
    speed_n: +fields[5],
    speed_n_type: fields[6],
    speed_k: +fields[7],
    speed_k_type: fields[8],
    status: fields[9]
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
