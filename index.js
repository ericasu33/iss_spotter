// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked! Returned IP" , ip);
// });

// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('173.181.11.244', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error.message);
//     return;
//   }
//   console.log("It worked!", coords);
// });

// const { fetchISSFlyOverTimes } = require('./iss');

// fetchISSFlyOverTimes({ latitude: 49.2286, longitude: -122.9317 }, (error, flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work!", error.message);
//     return;
//   }
//   console.log("It worked!", flyOverTimes);
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printFlyOverTimes = function(flyOverTime) {
  for (const pass of flyOverTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    console.log("It didn't work!", error.message);
    return;
  }
  printFlyOverTimes(flyOverTimes);
});