import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { confirmRide } from "./confirm_ride"
import { estimateRide } from "./estimate_ride"
import { getRideList } from "./get_ride_list"

export const RideRoutes = async (app:FastifyInstance) => {
    const prefix = "/ride"
    app.register(estimateRide, {prefix})
    app.register(confirmRide, {prefix})
    app.register(getRideList, {prefix})
}