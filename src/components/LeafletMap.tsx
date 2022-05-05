import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { Popup } from "react-leaflet";
import { Vehicle } from "../models/dataModel";
import { WorkerCommunicationSend } from "../models/WorkerCommunicationSend";
import { WorkerCommunicationGet } from "../models/WorkerCommunicationGet";
import "./LeafletMap.scss";

const defaultLatLng: LatLngTuple = [54.352024, 18.646639];
const zoom: number = 10;

interface LeafletMap {
  workerData?: WorkerCommunicationGet;
  worker?: any;
}

const LeafletMap = ({ workerData, worker }: LeafletMap) => {
  function getCheckboxValueString(className: string) {
    const elementsCheckbox = document.querySelectorAll(`.${className}:checked`);
    const tempArray: any[] = [];
    elementsCheckbox.forEach((vehicle: any) => {
      tempArray.push(vehicle.value);
    });
    if (elementsCheckbox.length === 0) {
      tempArray.push("-1");
    }
    return tempArray;
  }

  function getCheckboxValueNum(className: string) {
    const elementsCheckbox = document.querySelectorAll(`.${className}:checked`);
    const tempArray: any[] = [];
    elementsCheckbox.forEach((vehicle: any) => {
      tempArray.push(Number(vehicle.value));
    });
    if (elementsCheckbox.length === 0) {
      tempArray.push(-1);
    }
    return tempArray;
  }

  function handleStopBtn() {
    let tempMessage: WorkerCommunicationSend = {
      filter: {
        direction: [-1],
        vehicleCode: ["-1"],
        headsign: ["-1"],
      },
      status: 0,
    };
    worker?.postMessage(tempMessage);
  }

  function handleStartBtn() {
    let tempMessage: WorkerCommunicationSend = {
      filter: {
        direction: [-1],
        vehicleCode: ["-1"],
        headsign: ["-1"],
      },
      status: 1,
    };
    worker?.postMessage(tempMessage);
  }

  return (
    <>
      <MapContainer id="mapId" center={defaultLatLng} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {workerData?.data
          ? workerData.data?.vehicles.map((item: Vehicle) => {
              const pos: LatLngTuple = [item.lat, item.lon];
              return (
                <Marker position={pos} key={item.vehicleId}>
                  <Popup>
                    Linia: {item.direction} <br />
                    Kierunek: {item.headsign} <br />
                    Autobus: {item.vehicleCode}
                  </Popup>
                </Marker>
              );
            })
          : ""}
      </MapContainer>
      <div className="status__box">
        <h4>Map status: {workerData?.status === 1 ? "Running" : "Stopped"}</h4>
        {workerData?.status === 1 ? (
          <button
            onClick={() => {
              handleStopBtn();
            }}
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => {
              handleStartBtn();
            }}
          >
            Start
          </button>
        )}
      </div>
      <div className="filter__box">
        <h3>Filters</h3>
        <div className="boxes">
          <div className="box__direction">
            <h5>Direction:</h5>
            <button
              onClick={() => {
                document
                  .getElementById("directionContainer")
                  ?.classList.toggle("hide");
              }}
            >
              {document
                .getElementById("directionContainer")
                ?.classList.contains("hide")
                ? "Show"
                : "Hide"}
            </button>
            <div id="directionContainer" className="hide">
              {workerData?.data
                ? workerData.data?.vehicles
                    .filter((item, index, self) => {
                      return (
                        index ===
                        self.findIndex((t) => t.direction === item.direction)
                      );
                    })
                    .sort((a, b) => {
                      return a.direction - b.direction;
                    })
                    .map((item: Vehicle) => {
                      return (
                        <div key={`busDirection${item.vehicleId}`}>
                          <input
                            className="direction__checkbox"
                            type="checkbox"
                            id={`busDirection${item.vehicleId}`}
                            name="busDirection"
                            value={item.direction}
                          />
                          <label htmlFor={`busDirection${item.vehicleId}`}>
                            {item.direction}
                          </label>
                        </div>
                      );
                    })
                : ""}
            </div>
          </div>
          <div className="box__headsign">
            <h5>Headsign:</h5>
            <button
              onClick={() => {
                document
                  .getElementById("headsignContainer")
                  ?.classList.toggle("hide");
              }}
            >
              {document
                .getElementById("headsignContainer")
                ?.classList.contains("hide")
                ? "Show"
                : "Hide"}
            </button>
            <div id="headsignContainer" className="hide">
              {workerData?.data
                ? workerData.data?.vehicles
                    .filter((item, index, self) => {
                      return (
                        index ===
                        self.findIndex((t) => t.headsign === item.headsign)
                      );
                    })
                    .sort((a, b) => {
                      return a.headsign.localeCompare(b.headsign);
                    })
                    .map((item: Vehicle) => {
                      return (
                        <div key={`busHeadsign${item.vehicleId}`}>
                          <input
                            className="headsign__checkbox"
                            type="checkbox"
                            id={`busHeadsign${item.vehicleId}`}
                            name="busHeadsign"
                            value={item.headsign}
                          />
                          <label htmlFor={`busHeadsign${item.vehicleId}`}>
                            {item.headsign}
                          </label>
                        </div>
                      );
                    })
                : ""}
            </div>
          </div>
          <div className="box__vehicleCode">
            <h5>Vehicle Code</h5>
            <button
              onClick={() => {
                document
                  .getElementById("vehicleCodeContainer")
                  ?.classList.toggle("hide");
              }}
            >
              {document
                .getElementById("vehicleCodeContainer")
                ?.classList.contains("hide")
                ? "Show"
                : "Hide"}
            </button>
            <div id="vehicleCodeContainer" className="hide">
              {workerData?.data
                ? workerData.data?.vehicles
                    .sort((a, b) => {
                      return a.vehicleCode.localeCompare(b.vehicleCode);
                    })
                    .map((item: Vehicle) => {
                      return (
                        <div key={`busVehicleCode${item.vehicleId}`}>
                          <input
                            className="vehicleCode__checkbox"
                            type="checkbox"
                            id={`busVehicleCode${item.vehicleId}`}
                            name="busVehicleCode"
                            value={item.vehicleCode}
                          />
                          <label htmlFor={`busVehicleCode${item.vehicleId}`}>
                            {item.vehicleCode}
                          </label>
                        </div>
                      );
                    })
                : ""}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            const tempMessage: WorkerCommunicationSend = {
              filter: {
                direction: getCheckboxValueNum("direction__checkbox"),
                headsign: getCheckboxValueString("headsign__checkbox"),
                vehicleCode: getCheckboxValueString("vehicleCode__checkbox"),
              },
              status: 1,
            };
            worker.postMessage(tempMessage);
          }}
        >
          Filter
        </button>
      </div>
    </>
  );
};

export default LeafletMap;
