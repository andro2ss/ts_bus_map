
    export interface Vehicle {
        generated: Date;
        routeShortName: string;
        tripId?: number;
        headsign: string;
        vehicleCode: string;
        vehicleService: string;
        vehicleId: number;
        speed: number;
        direction: number;
        delay: number;
        scheduledTripStartTime?: Date;
        lat: number;
        lon: number;
        gpsQuality: number;
    }

    export interface DataModel {
        lastUpdate: Date;
        vehicles: Vehicle[];
    }


