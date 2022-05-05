import { WorkerCommunicationSend } from "../../../models/WorkerCommunicationSend";

export default function handleStopBtn(worker: any) {
  let tempMessage: WorkerCommunicationSend = {
    filter: {
      direction: [-1],
      vehicleCode: ["-1"],
      headsign: ["-1"],
    },
    status: 0,
  };
  worker?.postMessage(tempMessage);
}
