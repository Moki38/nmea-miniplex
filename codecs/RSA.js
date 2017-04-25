exports.ID = 'RSA';
exports.TYPE = 'rudder-sensor-angle';

exports.decode = function(fields) {
  /*
RSA Rudder Sensor Angle
 1 2 3 4 5
 | | | | |
$--RSA,x.x,A,x.x,A*hh
1) Starboard (or single) rudder sensor, "-" means Turn To Port
2) Status, A means data is valid
3) Port rudder sensor
4) Status, A means data is valid
5) Checksum
*/

  return {
    sentence: exports.ID,
    type: exports.TYPE,
    starboardRudderSensor : fields[1],
    statusStarboard : fields[2],
    portRudderSensor : fields[3],
    statusPort : fields[4],
  }
}
