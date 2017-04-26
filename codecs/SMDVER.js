exports.ID = 'SMDVER';
exports.TYPE = 'mux';

exports.decode = function(fields) {
  /*
$PSMDVER – Get Version
This sentence retrieves version information from the multiplexer.
Format: $PSMDVER
The multiplexer responds with the following version sentence:
$PSMDVER,3.20.0,MiniPlex-2S,10025943,8040*hh<CR><LF>
3.20.0: firmware version number
MiniPlex-2S: multiplexer name
10025943: serial number
8040: Multiplexer capabilities. This is a 4 digit, 16-bit field represented as a hexadecimal number.
Each bit identifies a capability of the multiplexer. The following bits are defined:
1-0: Host interface type, 0 = serial, 1 = USB, 2 = Ethernet, 3 = USB & WiFi
2: Bluetooth module installed
6: Firmware update supported
15: 3rd generation multiplexer
hh: checksum

   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    firmware : fields[1],
    mux_name : fields[2],
    mux_serial : fields[3],
    mux_cap : fields[4],
    status : fields[5]
  }
}
