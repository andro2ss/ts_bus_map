import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Vehicle } from "../../../models/dataModel";
import { LatLngTuple } from "leaflet";
import { WorkerCommunicationGet } from "../../../models/WorkerCommunicationGet";
import "./MapBox.scss";

const defaultLatLng: LatLngTuple = [54.352024, 18.646639];
const zoom: number = 10;

interface MapBoxInterface {
  workerData?: WorkerCommunicationGet;
}

function MapBox({ workerData }: MapBoxInterface) {
  return (
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
                  Direction: {item.direction} <br />
                  Head sign: {item.headsign} <br />
                  Vehicle Code: {item.vehicleCode}
                </Popup>
              </Marker>
            );
          })
        : ""}
    </MapContainer>
  );
}

export default MapBox;
