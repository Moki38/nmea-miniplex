exports.ID = 'ROT';
exports.TYPE = 'rate-of-turn';

exports.decode = function(fields) {
  /*
ROT Rate Of Turn
 1 2 3
 | | |
$--ROT,x.x,A*hh
1) Rate Of Turn, degrees per minute, "-" means bow turns to port
2) Status, A means data is valid
3) Checksum
   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    rateOfTurn : fields[1],
    status : fields[2]
  }
}
