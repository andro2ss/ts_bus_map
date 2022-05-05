export interface WorkerCommunicationSend {
    filter: {
        direction: number[];
        headsign: string[];
        vehicleCode: string[];
    }
    status: number
}
