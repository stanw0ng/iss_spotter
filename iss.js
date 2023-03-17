const { parse } = require('path');
const request = require('request');

// IPIFY API
const fetchMyIP = function(callback) {
  
  const url = `https://api.ipify.org/?format=json`;
  
  request(url, (error, response, body) => {
    
    //failures from
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const errorMsg = `Invalid status code: ${response.statusCode}`;
      callback(errorMsg, null);
      return;
    }

    // successful request
    const fetchedIP = JSON.parse(body).ip;
    callback(null, fetchedIP);
  });
};

// module.exports = {
//   fetchMyIP
// };

// IPWHOIS API
const fetchCoordsByIP = function(ip, callback) { 

  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    // successful request
    const data = JSON.parse(body);

    if (!data.success) {
      const errorMsg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(errorMsg, null);
      return;
    }

    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

// module.exports = {
//   fetchCoordsByIP
// };

// ISS-FLYOVER API

const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`; // takes the coordinate objects lat and long declared in the index.js

  request(url, (error, response, body) => {

    if(error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMsg = `Invalid status code: ${response.statusCode}`;
      callback(errorMsg, null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes) // passes take a { risetime :28379474816, duration: 545  } format, number is in seconds
  });
};

// module.exports = {
//   fetchISSFlyOverTimes
// };

// ULTIMATE BLUE EYES WHITE DRAGON --- TRIPLE CALLBACKS

const nextISSTimesForMyLocation = function(callback) { //this works because the functions and requests have already been defined from above
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => { //notice how ip is passed down
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => { //notice how loc is passed down
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses); // notice how nextPasses is passed finally goes through
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };