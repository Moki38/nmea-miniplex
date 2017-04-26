var helpers = require("../helpers.js")

/*
=== GLL - GPS Satellite Fault Detection ===

------------------------------------------------------------------------------
            1      2   3   4   5   6   7   8   9
            |      |   |   |   |   |   |   |   |
 $--GBS,hhmmss.ss,x.x,x.x,x.x,x.x,x.x,x.x,x.x*hh<CR><LF>
------------------------------------------------------------------------------

Field Number: 

  1) UTC time of the GGA or GNS fix associated with this sentence
  2) Expected error in latitude (meters)
  3) Expected error in longitude (meters)
  4) Expected error in altitude (meters)
  5) PRN of most likely failed satellite
  6) Probability of missed detection for most likely failed satellite
  7) Estimate of bias in meters on most likely failed satellite
  8) Standard deviation of bias estimate
  9) Checksum

 */

exports.TYPE = 'geo-position';
exports.ID = 'GBS';

exports.decode = function(fields) {
        return {
            sentence: exports.ID,
            type: 'geo-position',
            timestamp: fields[1]
        };
    }

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
}
