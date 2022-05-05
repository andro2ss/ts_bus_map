import React from "react";
import "./StatusBox.scss";
import handleStopBtn from "../helpers/handleStopBtn";
import handleStartBtn from "../helpers/handleStartBtn";
import { LeafletMapInterface } from "../../../models/LeafletMapInterface";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function StatusBox({ workerData, worker }: LeafletMapInterface) {
  return (
    <Paper elevation={3} className="status__box">
      <h4>Map status: {workerData?.status === 1 ? "Running" : "Stopped"}</h4>
      {workerData?.status === 1 ? (
        <Button
          variant="outlined"
          onClick={() => {
            handleStopBtn(worker);
          }}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            handleStartBtn(worker);
          }}
        >
          Start
        </Button>
      )}
    </Paper>
  );
}

export default StatusBox;
