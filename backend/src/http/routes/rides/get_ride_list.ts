import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../../lib/prisma";
import { Ride } from "./types";

  
const myPreHandler = (request: FastifyRequest<{ Params: { customer_id: string } }>, reply: FastifyReply, done: () => void) => {
    const {customer_id} = request.params;
    if(!customer_id){
        return reply.status(404).send({
            "error_code":"NO_RIDES_FOUND",
            "error_description":"O id do cliente não pode estar em branco."
        })
    }
    done();
};

export const getRideList = async (app:FastifyInstance) => {
    app.get("/:customer_id",{preHandler:myPreHandler},async(request:FastifyRequest<{Querystring:{driver_id:Number},  Params: { customer_id: string } }>,reply:FastifyReply)=>{
        const c_id = request.params.customer_id;
        const d_id = Number(request.query.driver_id);

        if(d_id){
            const dbDriver = await prisma.driver.findUnique({
                where:{
                    id:d_id
                },
                select:{
                    id:true,
                    name:true
                }
            })
            if(!dbDriver){
                return reply.status(400).send({
                    "error_code":"INVALID_DRIVER",
                    "error_description":"O id do motorista informado é inválido."
                })
            }
            const resp = await prisma.ride.findMany({
                where:{customer_id:c_id,driver_id:d_id},
                include:{driver:true},
            })
            const rides:Ride[] = resp.map(obj=>({
                id: obj.id,
                date: obj.date,
                origin: obj.origin,
                destination:obj.destination,
                distance:obj.distance,
                duration:obj.duration,
                driver: {id: obj.driver.id,name: obj.driver.name},
                value: obj.value
            }))
            const response = {
                customer_id:c_id,
                rides
            }
            return reply.status(200).send(response)

        } else {
            const resp = await prisma.ride.findMany({
                where:{customer_id:c_id},
                include:{ driver:true},
            })
            const rides:Ride[] = resp.map(obj=>({
                id: obj.id,
                date: obj.date,
                origin: obj.origin,
                destination:obj.destination,
                distance:obj.distance,
                duration:obj.duration,
                driver: {id: obj.driver.id,name: obj.driver.name},
                value: obj.value
            }))
            const response = {
                customer_id:c_id,
                rides
            }
            return reply.status(200).send(response)
        }
    })
}