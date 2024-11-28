import 'dotenv/config';
import fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors"
import { insertDevaultDrivers } from "./lib/defaulDrivers";
import { insertDevaultDriversReviews } from "./lib/defaultDriversReview";

const app = fastify()

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Set-Cookie'],
});

app.register(routes)

insertDevaultDrivers();
insertDevaultDriversReviews();

insertDevaultDrivers();
insertDevaultDriversReviews();

app.listen({port: 8080, host:'0.0.0.0'}).then(() => {
    console.log("HTTP server running!!!")
})
