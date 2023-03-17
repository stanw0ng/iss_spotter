// iss part 1
// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

//////////////-------------

// iss part 2
// const { fetchCoordsByIP } = require('./iss');
// const ip = '97.108.183.55';

// fetchCoordsByIP(ip, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });

//////////////---------

// iss part 3
// const { fetchISSFlyOverTimes } = require('./iss');

// const coords = { latitude: 43.653226, longitude: -79.3831843 }

// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });

//////////////---------

// iss part 4
const { nextISSTimesForMyLocation } = require('./iss'); 

const formatPassTimes = function(passTimes) {
  for (const time of passTimes) {
    const datetime = new Date(0); //sets time to Epoch time (Jan 1, 1970, 00:00:00 UTC), the Date object autoformats "Day Mon DD YYYY HH:mm:ss GMT+ZZZZ (Timezone)"!
    datetime.setUTCSeconds(time.risetime); //adds risetime to Epoch time giving a nice formatted exact date
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  formatPassTimes(passTimes);
});