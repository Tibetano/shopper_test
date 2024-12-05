import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../../lib/prisma"
import { ConfirmRideData, Driver } from "./types"; 

const myPreHandler = (request: FastifyRequest<{Body: ConfirmRideData}>, reply: FastifyReply, done: () => void) => {
    const { customer_id, origin, destination } = request.body;
    if(!customer_id || !origin || !destination) {
        return reply.status(400).send({
            "error_code": "INVALID_DATA",
            "error_description": "Todos os campos devem ser preenchidos!"
            }
        );
    }
    if(origin === destination){
        return reply.status(400).send({
            "error_code":"INVALID_DATA",
            "error_description":"A origem e destino devem ser diferentes."
            }
        );
    }
    done();
};

export const confirmRide = async (app:FastifyInstance) => {
    app.patch('/confirm',{preHandler:myPreHandler},async(request:FastifyRequest<{Body:ConfirmRideData}>,reply:FastifyReply)=>{

        const { driver } = request.body;

        const dbDriver:Driver | null = await prisma.driver.findUnique({
            where:{ id:driver.id},
            select:{id:true, name:true,minKm:true}
        })
        
        if(!dbDriver || dbDriver.name !== request.body.driver.name){
            return reply.status(404).send({
                    "error_code":"DRIVER_NOT_FOUND",
                    "error_description":"O motorista informado não consta em nosso banco de dados."
                }
            );
        } 
        
        if(request.body.distance < (dbDriver.minKm*1000)){
            return reply.status(406).send(
                {
                    "error_code":"INVALID_DISTANCE",
                    "error_description":"A distância informada é menor que a distância mínima exigida pelo motorista informado."
                }
            );
        }
        
        try {
            await prisma.ride.create({
                data: {
                    date: new Date().toISOString(),
                    origin: request.body.origin,
                    destination: request.body.destination,
                    distance: request.body.distance,
                    duration: request.body.duration,
                    value: request.body.value,
                    customer_id: request.body.customer_id,
                    driver_id: request.body.driver.id
                },
            });
        } catch (error) {
            console.log(error)
        }  
        return reply.status(200).send({"success": true})
    })
}
