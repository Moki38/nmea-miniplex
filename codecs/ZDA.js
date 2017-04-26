exports.ID = 'ZDA';
exports.TYPE = 'time-date';

exports.decode = function(fields) {
  /*
ZDA Time & Date – UTC, Day, Month, Year and Local Time Zone
 1 2 3 4 5 6 7
 | | | | | | |
$--ZDA,hhmmss.ss,xx,xx,xxxx,xx,xx*hh
1) Local zone minutes description, same sign as local hours
2) Local zone description, 00 to +/- 13 hours
3) Year
4) Month, 01 to 12
5) Day, 01 to 31
6) Time (UTC)
7) Checksum
   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    hours : fields[1].substring(0,2),
    minutes : fields[1].substring(2,4),
    seconds : fields[1].substring(4,6),
    milliseconds : fields[1].split('.')[1],
    Day : fields[2],
    Month : +fields[3],
    Year : fields[4],
    UTC : fields[5]
  }
}
