import React from "react";
import Button from "@mui/material/Button";
import { Vehicle } from "../../../../models/dataModel";
import { FilterBoxInterface } from "../../../../models/FilterBoxInterface";

function BoxHeadsign({ workerData }: FilterBoxInterface) {
  return (
    <div className="box__headsign">
      <h5>Headsign:</h5>
      <Button
        variant="outlined"
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
      </Button>
      <div id="headsignContainer" className="box__checkbox hide">
        {workerData?.data
          ? workerData.data?.vehicles
              .filter((item, index, self) => {
                return (
                  index === self.findIndex((t) => t.headsign === item.headsign)
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
        {workerData &&
        workerData.data.vehicles.filter((item, index, self) => {
          return index === self.findIndex((t) => t.headsign === item.headsign);
        }).length > 0
          ? ""
          : "Empty"}
      </div>
    </div>
  );
}

export default BoxHeadsign;
