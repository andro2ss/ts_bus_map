let currentPos;
let targetPos;
let loadedPos;
let step = 0;
let dist;
let dataFromApp = {
  filter: {
    direction: [-1],
    headsign: ["-1"],
    vehicleCode: ["-1"],
  },
  status: 1,
};
let moveBuses;

// Fetch bus data
function getData() {
  fetch("https://ckan2.multimediagdansk.pl/gpsPositions?v=2")
    .then((response) => response.json())
    .then((data) => {
      loadedPos = data;
    });
}

//Calculate dist
function calcDist() {
  dist = targetPos.vehicles.map((bus) => {
    let currentBus = currentPos.vehicles.find((curBus) => {
      return curBus.vehicleId === bus.vehicleId;
    });
    if (currentBus) {
      let tempLat = (bus.lat - currentBus.lat) / 40;
      let tempLon = (bus.lon - currentBus.lon) / 40;
      return {
        id: bus.vehicleId,
        lat: tempLat,
        lon: tempLon,
      };
    } else {
      return {
        id: -999,
      };
    }
  });
}

//New vehicles pos
function tempVehicles() {
  return currentPos.vehicles
    .map((bus) => {
      let distBus = dist.find((curBus) => {
        return curBus.id === bus.vehicleId;
      });
      if (distBus) {
        bus.lon += distBus.lon;
        bus.lat += distBus.lat;
      }
      return bus;
    })
    .filter((bus) => {
      if (dataFromApp.filter.direction[0] === -1) {
        return bus;
      } else if (dataFromApp.filter.direction.includes(bus.direction)) {
        return bus;
      }
    })
    .filter((bus) => {
      if (dataFromApp.filter.headsign[0] === "-1") {
        return bus;
      } else if (dataFromApp.filter.headsign.includes(bus.headsign)) {
        return bus;
      }
    })
    .filter((bus) => {
      if (dataFromApp.filter.vehicleCode[0] === "-1") {
        return bus;
      } else if (dataFromApp.filter.vehicleCode.includes(bus.vehicleCode)) {
        return bus;
      }
    });
}

// Listener from app
self.addEventListener(
  "message",
  function (e) {
    if (e.data.status === 0) {
      stop();
    } else if (e.data.status === 1 && dataFromApp.status === 0) {
      start();
      postMessage({
        status: 1,
        data: currentPos,
      });
    }

    dataFromApp = e.data;
  },
  false
);

function movementLogic() {
  //fetch new bus data
  if (step === 15) {
    getData();
  }

  if (loadedPos) {
    //first usage
    if (!currentPos && !targetPos) {
      currentPos = loadedPos;
      targetPos = loadedPos;
      loadedPos = undefined;
    }

    //next usage
    if (step === 20) {
      step = 0;
      currentPos = targetPos;
      targetPos = loadedPos;
      loadedPos = undefined;
    }
  }

  // calc distance for 1 step
  if (currentPos && step === 0) {
    calcDist();
  }

  // output data with bus pos
  if (currentPos) {
    postMessage({
      status: 1,
      data: {
        lastUpdate: currentPos.lastUpdate,
        vehicles: tempVehicles(),
      },
    });
  }
  step += 0.5;
}

// start Interval with main movement logic
function start() {
  moveBuses = setInterval(() => {
    movementLogic();
  }, 500);
}

// stop Interval with main movement logic
function stop() {
  clearInterval(moveBuses);
  postMessage({
    status: 0,
    data: {
      lastUpdate: currentPos.lastUpdate,
      vehicles: tempVehicles(),
    },
  });
}

getData();
start();
