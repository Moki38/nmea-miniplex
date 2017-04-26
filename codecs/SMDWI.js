exports.ID = 'SMDWI';
exports.TYPE = 'mux';

exports.decode = function(fields) {
  /*
   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    mux_cap : fields[1],
    status : fields[2]
  }
}
