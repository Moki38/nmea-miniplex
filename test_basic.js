var nmea = require('./index.js');
//var nmea = require('nmea-miniplex');

var mbarToInch = function(m) {
  if(typeof m !== "number") {
    return "invalid input";
  } else {
    return m * 0.000295299830714;
  }
};

var nmeadata = { };

var env_sensors = setInterval(function () {
    nmeadata.temp = 20.7;
    nmeadata.humidity = 40.1;
    nmeadata.mbar = 1020;

    var d = nmea.encode('WI', {type:"meteo", id:"MDA",baro_bar: nmeadata.mbar, baro_inch: mbarToInch(nmeadata.mbar),air_temp: nmeadata.temp, abs_hum: nmeadata.humidity} );
    console.log(d);

    console.log(nmea.parse(d));

}, 3000);

