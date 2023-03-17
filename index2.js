const { nextISSTimesForMyLocation } = require('./iss_promised')

const formatPassTimes = function(passTimes) {
  for (const time of passTimes) {
    const datetime = new Date(0); //sets time to Epoch time (Jan 1, 1970, 00:00:00 UTC), the Date object autoformats "Day Mon DD YYYY HH:mm:ss GMT+ZZZZ (Timezone)"!
    datetime.setUTCSeconds(time.risetime); //adds risetime to Epoch time giving a nice formatted exact date
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    formatPassTimes(passTimes);
  })