exports.ID = 'PGN';
exports.TYPE = 'nmea-2000';

exports.decode = function(fields) {
  /*
$MXPGN – NMEA 2000 PGN Data
This sentence transports NMEA 2000 Single Frame messages over NMEA 0183. The MiniPlex will output
this sentence with Talker ID “MX”. When sent to the MiniPlex, the Talker ID is ignored unless a Filter Rule
exists for this sentence.
Format: $--PGN,pppppp,aaaa,c--c*hh<CR><LF>
pppppp: PGN of the NMEA 2000 message, 3 byte hexadecimal number. If the PGN is non-global, the
lowest byte contains the destination address.
aaaa: Attribute Word, 2 byte hexadecimal number. This word contains the priority, the DLC code and
then source/destination address of the message
c--c: Data field of the NMEA 2000 message, organized as one large number in hexadecimal notation
from MSB to LSB. This is in accordance with “NMEA 2000 Appendix D”, chapter D.1, “Data
Placement within the CAN Frame”.
The size of this field depends on the DLC value and can be 1 to 8 bytes (2 to 16 hexadecimal
characters).
   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    PGN : fields[1],
    Attribute : fields[2],
    DataField : fields[3]
  }
}
