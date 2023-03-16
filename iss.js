const { parse } = require('path');
const request = require('request');

// IPIFY API
// const fetchMyIP = function(callback) {
  
//   const url = `https://api.ipify.org/?format=json`;
  
//   request(url, (error, response, body) => {
    
//     //failures from
//     if (error) {
//       return callback(error, null);
//     }

//     if (response.statusCode !== 200) {
//       const errorMsg = `Invalid status code: ${response.statusCode}`;
//       callback(errorMsg, null);
//       return;
//     }

//     // successful request
//     const fetchedIP = JSON.parse(body).ip;
//     callback(null, fetchedIP);
//   });
// };

// module.exports = {
//   fetchMyIP
// };

// ipwhois API
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

module.exports = {
  fetchCoordsByIP
};