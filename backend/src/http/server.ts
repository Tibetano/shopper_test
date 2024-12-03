import fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors"

console.log(process.env.DATABASE_URL)
console.log(process.env.GOOGLE_API_KEY)


const app = fastify()

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Set-Cookie'],
});

app.register(routes)

app.listen({port: 8080, host:'0.0.0.0'}).then(() => {
    console.log("HTTP server running!!!")
})
