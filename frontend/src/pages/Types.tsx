  
export interface TripOption {
    name: string;
    price: number;
    time: number; 
}

export interface FormData {
    userId: string;
    origin: string;
    destination: string;
}

export interface RideEstimateData {
    customer_id: string;
    origin: string;
    destination: string;
}

export interface Origin {
    latitude: number;
    longitude: number;
}

export interface Destination {
    latitude: number;
    longitude: number;
}

export interface DriverOtion {
    
}

export interface ApiResponse {
    origin:Origin;
    destination:Destination;
    distance: number;
    duration: string;

    options: [];
    routeResponse:{};
}
