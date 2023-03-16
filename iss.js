const request = require('request');

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

module.exports = { fetchMyIP };