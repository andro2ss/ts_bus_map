import React, { useEffect, useState } from "react";
import "./App.css";
import LeafletMap from "./LeafletMap/LeafletMap";
import { WorkerCommunicationGet } from "../models/WorkerCommunicationGet";
import Container from "@mui/material/Container";

function App() {
  const [dataFromWorker, setDataFromWorker] =
    useState<WorkerCommunicationGet>();
  const [workerState, setWorkerState] = useState<any>();
  const onMessage = (event: any) => setDataFromWorker(event.data);

  useEffect(() => {
    const worker = new Worker("worker.js");
    worker.addEventListener("message", onMessage);
    setWorkerState(worker);
    return () => {
      worker.removeEventListener("error", onMessage);
      worker.terminate();
    };
  }, []);

  return (
    <Container maxWidth="xl" className="App">
      <LeafletMap workerData={dataFromWorker} worker={workerState} />
    </Container>
  );
}

export default App;
