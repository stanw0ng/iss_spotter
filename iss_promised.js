const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org/?format=json`);
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`)
}

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body) //destructing to extract from big JSON
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP() // return this result, then....
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
    const { response } = JSON.parse(body);
    return response;
  });
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
}
