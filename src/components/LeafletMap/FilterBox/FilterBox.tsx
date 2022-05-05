import React from "react";
import "./FilterBox.scss";
import { WorkerCommunicationSend } from "../../../models/WorkerCommunicationSend";
import getCheckboxValueNum from "../helpers/getCheckboxValueNum";
import getCheckboxValueString from "../helpers/getCheckboxValueString";
import { LeafletMapInterface } from "../../../models/LeafletMapInterface";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import BoxDirection from "./boxes/BoxDirection";
import BoxHeadsign from "./boxes/BoxHeadsign";
import BoxVehicleCode from "./boxes/BoxVehicleCode";

function FilterBox({ workerData, worker }: LeafletMapInterface) {
  return (
    <Paper elevation={3} className="filter__box">
      <h3>Filters</h3>
      <div className="boxes">
        <BoxDirection workerData={workerData} />
        <BoxHeadsign workerData={workerData} />
        <BoxVehicleCode workerData={workerData} />
      </div>

      <Button
        className="filter__btn"
        variant="contained"
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
      </Button>
    </Paper>
  );
}

export default FilterBox;
