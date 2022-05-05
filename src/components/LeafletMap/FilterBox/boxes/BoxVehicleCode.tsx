import React from "react";
import Button from "@mui/material/Button";
import { Vehicle } from "../../../../models/dataModel";
import { FilterBoxInterface } from "../../../../models/FilterBoxInterface";

function BoxDirection({ workerData }: FilterBoxInterface) {
  return (
    <div className="box__vehicleCode">
      <h5>Vehicle Code</h5>
      <Button
        variant="outlined"
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
      </Button>
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
      </div>{" "}
    </div>
  );
}

export default BoxDirection;
