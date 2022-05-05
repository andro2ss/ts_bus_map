import React from "react";
import "./LeafletMap.scss";
import MapBox from "./MapBox/MapBox";
import { LeafletMapInterface } from "../../models/LeafletMapInterface";
import StatusBox from "./StatusBox/StatusBox";
import FilterBox from "./FilterBox/FilterBox";

const LeafletMap = ({ workerData, worker }: LeafletMapInterface) => {
  return (
    <>
      <h1>Bus Map</h1>
      <MapBox workerData={workerData} />
      <StatusBox worker={worker} workerData={workerData} />
      <FilterBox worker={worker} workerData={workerData} />
    </>
  );
};

export default LeafletMap;
