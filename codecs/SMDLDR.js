exports.ID = 'SMDLDR';
exports.TYPE = 'mux';

exports.decode = function(fields) {
  /*
   === PRDID - RDI Proprietary Heading, Pitch, Roll ===

   
   ------------------------------------------------------------------------------
             1   2    3     4
             |   |    |     |
   $PSMDLDR,-2.06,4.81,37.62*6D<CR><LF>
   ------------------------------------------------------------------------------

   Field Number:

Format: $PSMDLDR,xx,v.v,zzz
xx: Hardware ID of the multiplexer (a hexadecimal number)
v.v: Bootloader version number
zzz: Hardware name of the multiplexer
The following hardware ID’s and names are defined:
01: MPX-S (board with RS-232 interface)
02: MPX-U (board with USB interface)
03: MPX-E (board with Ethernet interface)
04: MPX-W (board with USB and WiFi interface)
When bit 7 of the hardware ID is set, e.g. 81, the board has a Bluetooth module installed.
Example: $PSMDLDR,82,1.2,MPX-U
This multiplexer has a MPX

   */
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    hwid : fields[1],
    bootldr : fields[2],
    name : fields[3],
  }
}
