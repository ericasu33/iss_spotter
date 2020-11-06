//callback to pass back error or IP string
//Returns:
// error , if any (nullable)
// IP string (null if error)
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching geo coordinates for IP. Response: ${body}`), null);
      return;
    }

    const { status, lat, lon } = JSON.parse(body);

    if (status === "fail") {
      callback(Error(`Invalid IP Address: ${ip}`), null);
      return;
    }

    const geoCoordByIP = {};
    geoCoordByIP["latitude"] = lat;
    geoCoordByIP["longitude"] = lon;
    
    callback(null, geoCoordByIP);
  });
  
};

const fetchISSFlyOverTimes = function({ latitude, longitude }, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass time: ${body}`), null);
      return;
    }

    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTime) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(null, flyOverTime);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };