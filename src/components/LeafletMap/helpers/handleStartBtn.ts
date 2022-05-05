import { WorkerCommunicationSend } from "../../../models/WorkerCommunicationSend";

export default function handleStartBtn(worker: any) {
  let tempMessage: WorkerCommunicationSend = {
    filter: {
      direction: [-1],
      vehicleCode: ["-1"],
      headsign: ["-1"],
    },
    status: 1,
  };
  worker?.postMessage(tempMessage);
}
