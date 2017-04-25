exports.TYPE = 'nav-info';
exports.ID = 'FEC';

exports.decode = function(fields) {
  switch (fields[1]) {
    case 'GPatt':
      return {
        sentence: exports.ID,
        type: exports.TYPE,
        pitch: +fields[3],
        roll: +fields[4]
      };
      break;
    default:
      return {
        sentence: exports.ID,
        type: exports.TYPE,
        unknown: +fields[1]
      };
      break;
  } 
}
