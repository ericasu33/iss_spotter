const { nextISSTimeForMyLocation } = require('./iss_promised');

const printFlyOverTimes = function(flyOverTime) {
  for (const pass of flyOverTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

nextISSTimeForMyLocation()
  .then((flyOverTimes) => {
    printFlyOverTimes(flyOverTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });