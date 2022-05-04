import React, {useEffect, useState} from 'react';
import './App.css';
import LeafletMap from './LeafletMap';
import {DataModel} from "../models/dataModel";

function App() {

  const [message, setMessage] = useState<DataModel>();
  const onMessage = (event :any) => setMessage(event.data);

  useEffect(() => {
    const worker = new Worker("worker.js");
    worker.addEventListener("message", onMessage);
    return () => {
      worker.removeEventListener("error", onMessage);
      worker.terminate();
    };
  }, []);

  return (
    <div className="App">
      <LeafletMap pinsData={message}/>

      {message?.lastUpdate}
    </div>
  );
}

export default App;
