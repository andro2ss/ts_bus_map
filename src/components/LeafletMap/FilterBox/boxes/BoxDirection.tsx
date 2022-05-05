import React from "react";
import Button from "@mui/material/Button";
import { Vehicle } from "../../../../models/dataModel";
import { FilterBoxInterface } from "../../../../models/FilterBoxInterface";

function BoxDirection({ workerData }: FilterBoxInterface) {
  return (
    <div
      className="    margin-bottom: 1rem;
box__direction"
    >
      <h5>Direction:</h5>
      <Button
        variant="outlined"
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
      </Button>
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
  );
}

export default BoxDirection;
