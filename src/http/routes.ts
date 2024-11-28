import { FastifyInstance } from "fastify";
import { RideRoutes } from "./routes/rides/@RideRoutes";

export const routes = async (app:FastifyInstance) => {
    app.register(RideRoutes)
}
