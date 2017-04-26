exports.ID = 'DPT';
exports.TYPE = 'depth';

exports.decode = function(fields) {
  /*
DPT Depth – Depth & Offset
 1 2 3
 | | |
$--DPT,x.x,x.x*hh
1) Depth, meters
2) Offset from transducer;
 positive means distance from transducer to water line,
 negative means distance from transducer to keel
3) Checksum
   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    depth : fields[1],
    offset : fields[2]
  }
}
