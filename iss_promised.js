const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (ip) => {
  const IP = JSON.parse(ip).ip;
  return request(`http://ip-api.com/json/${IP}`);
  
};

const fetchISSFlyOverTimes = (coords) => {
  const { lat, lon } = JSON.parse(coords);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
};

const nextISSTimeForMyLocation = () => {
  return fetchMyIP() //returning chained promises
    .then(fetchCoordsByIP)  // don't neeed the () because the function itself is a call back function ///=>  (data) => {function stuff}; so techincally we could remove the name and just throw the function body in side .then()
    .then(fetchISSFlyOverTimes)
    .then((flyOverTimes) => {
      const { response } = JSON.parse(flyOverTimes);
      return response;    //returning "response" here because we had to assign a varaible to flyOverTimes as we had to parse it first.
    });
};

//these functions are considered as a promise because of the asyc "request" being used?

module.exports = { nextISSTimeForMyLocation };
