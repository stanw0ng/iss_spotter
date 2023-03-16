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
const { fetchISSFlyOverTimes } = require('./iss');

const coords = { latitude: 43.653226, longitude: -79.3831843 }

fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});