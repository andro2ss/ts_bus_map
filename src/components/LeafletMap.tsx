import React from 'react';
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import {Popup} from 'react-leaflet';
import {DataModel, Vehicle} from "../models/dataModel";

const defaultLatLng: LatLngTuple = [54.352024, 18.646639];
const zoom: number = 10;

interface LeafletMap {
    pinsData? : DataModel
}

const LeafletMap = ({ pinsData }: LeafletMap) => {

        return (<>
            <MapContainer id="mapId"
                          center={defaultLatLng}
                          zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pinsData ? pinsData?.vehicles.map((item: Vehicle) => {
                    const pos: LatLngTuple= [item.lat, item.lon]
                        return <Marker position={pos} key={item.vehicleId}>
                            <Popup>
                                Linia: {item.direction} <br/>
                                Kierunek: {item.headsign} <br/>
                                Autobus: {item.vehicleCode}
                            </Popup>
                        </Marker>
                    })
                    : ""}


            </MapContainer>
        </>
    )
}

export default LeafletMap;
