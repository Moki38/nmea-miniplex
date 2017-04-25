// A NMEA-0183 parser based on the format given here: http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf

var APB = require('./codecs/APB.js')
var BWC = require('./codecs/BWC.js')
var DBT = require('./codecs/DBT.js')
var DPT = require('./codecs/DPT.js')
var FEC = require('./codecs/FEC.js')
var GBS = require('./codecs/GBS.js')
var GGA = require('./codecs/GGA.js')
var GLL = require('./codecs/GLL.js')
var GSA = require('./codecs/GSA.js')
var GSV = require('./codecs/GSV.js')
var HDG = require('./codecs/HDG.js')
var HDM = require('./codecs/HDM.js')
var HDT = require('./codecs/HDT.js')
var MDA = require('./codecs/MDA.js')
var MMB = require('./codecs/MMB.js')
var MTA = require('./codecs/MTA.js')
var MTW = require('./codecs/MTW.js')
var MWV = require('./codecs/MWV.js')
var PGN = require('./codecs/PGN.js')
var RDID = require('./codecs/RDID.js')
var RMC = require('./codecs/RMC.js')
var ROT = require('./codecs/ROT.js')
var RSA = require('./codecs/RSA.js')
var SMDLDR = require('./codecs/SMDLDR.js')
var SMDVER = require('./codecs/SMDVER.js')
var SMDWI = require('./codecs/SMDWI.js')
var TXT = require('./codecs/TXT.js')
var VDM = require('./codecs/VDM.js')
var VDO = require('./codecs/VDO.js')
var VHW = require('./codecs/VHW.js')
var VLW = require('./codecs/VLW.js')
var VTG = require('./codecs/VTG.js')
var XDR = require('./codecs/XDR.js')
var ZDA = require('./codecs/ZDA.js')

// export helpers
module.exports.Helpers= require('./helpers.js');

var validLine = function (line) {
  // check that the line passes checksum validation
  // checksum is the XOR of all characters between $ and * in the message.
  // checksum reference is provided as a hex value after the * in the message.
  var checkVal = 0;
  var parts = line.split('*');
  for (var i = 1; i < parts[0].length; i++) {
    checkVal = checkVal ^ parts[0].charCodeAt(i);
  }
  ;
  return checkVal == parseInt(parts[1], 16);
};

exports.traditionalDecoders = {
  APB: APB.decode,
  BWC: BWC.decode,
  DBT: DBT.decode,
  DPT: DPT.decode,
  FEC: FEC.decode,
  GBS: GBS.decode,
  GGA: GGA.decode,
  GLL: GLL.decode,
  GSA: GSA.decode,
  GSV: GSV.decode,
  HDG: HDG.decode,
  HDM: HDM.decode,
  HDT: HDT.decode,
  MDA: MDA.decode,
  MMB: MMB.decode,
  MTA: MTA.decode,
  MTW: MTW.decode,
  MWV: MWV.decode,
  PGN: PGN.decode,
  RDID: RDID.decode,
  RMC: RMC.decode,
  ROT: ROT.decode,
  RSA: RSA.decode,
  SMDLDR: SMDLDR.decode,
  SMDVER: SMDVER.decode,
  SMDWI: SMDWI.decode,
  TXT: TXT.decode,
  VDM: VDM.decode,
  VDO: VDO.decode,
  VHW: VHW.decode,
  VLW: VLW.decode,
  VTG: VTG.decode,
  XDR: XDR.decode,
  ZDA: ZDA.decode,
};

exports.encoders = new Object();

exports.encoders[DBT.TYPE] = DBT;
exports.encoders[GBS.TYPE] = GBS;
exports.encoders[GLL.TYPE] = GLL;
exports.encoders[HDG.TYPE] = HDG;
exports.encoders[HDM.TYPE] = HDM;
exports.encoders[HDT.TYPE] = HDT;
exports.encoders[MDA.TYPE] = MDA;
exports.encoders[MMB.TYPE] = MMB;
exports.encoders[MTA.TYPE] = MTA;
exports.encoders[MTW.TYPE] = MTW;
exports.encoders[MWV.TYPE] = MWV;
exports.encoders[TXT.TYPE] = TXT;
exports.encoders[VHW.TYPE] = VHW;
exports.encoders[VLW.TYPE] = VLW;
exports.encoders[VTG.TYPE] = VTG;
exports.encoders[XDR.TYPE] = XDR;

exports.parse = function (line) {
  console.log(line);
  if (validLine(line)) {
    var fields = line.split('*')[0].split(','),
      talker_id,
      msg_fmt;
    if (fields[0].charAt(1) == 'P') {
      talker_id = 'P'; // Proprietary
      msg_fmt = fields[0].substr(2);
    } else {
      talker_id = fields[0].substr(1, 2);
      msg_fmt = fields[0].substr(3);
    }
    console.log("msg_fmt: "+msg_fmt);

    var parser = exports.traditionalDecoders[msg_fmt];
    if (parser) {
      var val = parser(fields);
      val.talker_id = talker_id;
      return val;
    } else {
      throw Error("Error in parsing:" + line);
    }
  } else {
//    throw Error("Invalid line:" + line);
    console.log("Invalid line:" + line);
  }
};

exports.encode = function (talker, msg) {
  if (typeof msg === 'undefined') {
    throw new Error("Can not encode undefined, did you forget msg parameter?");
  }
  encoder = exports.encoders[msg.type];
  if (encoder) {
    return encoder.encode(talker, msg);
  } else {
    throw Error("No encoder for type:" + msg.type);
  }
}

exports.createDefaultTransformer = function (options) {
  var stream = require('through')(function (data) {
    try {
      stream.queue(exports.parse(data));
    } catch (e) {
    }
  });
  return stream;
};

