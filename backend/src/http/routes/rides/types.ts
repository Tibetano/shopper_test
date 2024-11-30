
export type Driver = {
    id: number;
    name: string;
    minKm: number; 
};

export type ConfirmRideData = {
    customer_id: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: {
        id: number,
        name: string
    },
    value: number
}

export type RideEstimateData = {
    customer_id: string,
    origin: string,
    destination: string
}

export type Ride = {
    id: number;
    date: Date;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: DriverWithoutKmMin;
    value: number;
}
  
export type DriverWithoutKmMin = {
    id: number;
    name: string;
}