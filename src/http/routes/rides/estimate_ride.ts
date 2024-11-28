import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import axios from "axios";
import { prisma } from "../../lib/prisma";
import { RideEstimateData } from "./types";

const myPreHandler = (request: FastifyRequest<{Body: RideEstimateData}>, reply: FastifyReply, done: () => void) => {
    if(request.body.customer_id == "" || request.body.origin == "" || request.body.destination == "") {
        return reply.status(400).send({
            "error_code": "INVALID_DATA",
            "error_description": "Todos os campos devem ser preenchidos."
            }
        );
    }
    if (request.body.origin === request.body.destination){
        return reply.status(400).send({
            "error_code": "INVALID_DATA",
            "error_description": "O local de origem e destino devem ser diferentes."
            }
        );
    }
    done();
};
  
export const estimateRide = (app:FastifyInstance) => {
    app.post('/estimate',{preHandler:myPreHandler},async(request:FastifyRequest<{Body:RideEstimateData}>,reply:FastifyReply)=>{
        const config = {
            headers:{
            "Content-Type":"application/json",
            "X-Goog-Api-Key":process.env.GOOGLE_API_KEY,
            "X-Goog-FieldMask":"*"
            }
        }
        const data = {
            origin:{
              address:`${request.body.origin}`
            },
            destination:{
              address:`${request.body.destination}`
            },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_AWARE",
            computeAlternativeRoutes: false,
            routeModifiers: {
              avoidTolls: false,
              avoidHighways: false,
              avoidFerries: false
            },
            languageCode: "pt-BR",
            units: "IMPERIAL"
        }
        const GoogleMapsResponse = await axios.post("https://routes.googleapis.com/directions/v2:computeRoutes",data,config)
        const drivers = await prisma.driver.findMany({
            where:{
                minKm: {
                    lte:(GoogleMapsResponse.data.routes[0].distanceMeters/1000)
                } 
            },
            include: {
                review: {
                    select:{
                        rating: true,
                        comment: true
                    }
                }
            },
            orderBy:{
                review:{
                rating:"asc"
                }
            },
        })
        const driversWithValue = drivers.map(driver=>({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            minKm: driver.minKm,
            rate: driver.rate,
            review: driver.review,
            value:(GoogleMapsResponse.data.routes[0].distanceMeters/1000)*driver.rate
        }))
        const response = {
            origin: {
                latitude: GoogleMapsResponse.data.routes[0].legs[0].startLocation.latLng.latitude,
                longitude: GoogleMapsResponse.data.routes[0].legs[0].startLocation.latLng.longitude
            },
            destination: {
                latitude: GoogleMapsResponse.data.routes[0].legs[0].endLocation.latLng.latitude,
                longitude: GoogleMapsResponse.data.routes[0].legs[0].endLocation.latLng.longitude
            },
            distance: GoogleMapsResponse.data.routes[0].distanceMeters,
            duration: GoogleMapsResponse.data.routes[0].duration,
            options:driversWithValue,
            routeResponse:GoogleMapsResponse.data
        }
        return reply.status(200).send(response)
    })
}
