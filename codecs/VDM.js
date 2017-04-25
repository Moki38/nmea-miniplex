var helpers = require("../helpers.js")

/*
 === VDM - AIS sentence ===

 ------------------------------------------------------------------------------
 *******1 2 3 4 5   6 7
 *******| | | | |   | |
 $--VDM,x,x,x,a,s-s,x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Total number of Sequences (1-9)
 2. Sequence Number (1-9)
 3. Sequential message identifier (0-9)
 4. AIS Channel
 5. Encapsultaled radio message
 6. Fillbits (0-5)
 7. Checksum
 */

exports.TYPE = 'AIS-Data';
exports.ID = 'VDM';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    totalNumberOFSequences: +fields[1],
    sequenceNumber: +fields[2],
    sequentialMessageId: +fields[3],
    aisChannel: fields[4],
    radioMessage: fields[5],
    fillbits: +fields[6]
  }
}
