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

// ipwhois API
const fetchCoordsByIP = function (ip, callback) {
  
  const url = `http://ipwho.is/` + ip

  request(url + ip, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return
    }

    // successful request
    const parsedBody = JSON.parse(body);

    if (!parse.body.success) {
      const errorMsg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(errorMsg, null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
}

module.exports = {
  fetchCoordsByIP
};