import React, { useEffect, useState } from "react";
import "./App.css";
import LeafletMap from "./LeafletMap";
import { WorkerCommunicationGet } from "../models/WorkerCommunicationGet";

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
    <div className="App">
      <LeafletMap workerData={dataFromWorker} worker={workerState} />
    </div>
  );
}

export default App;
