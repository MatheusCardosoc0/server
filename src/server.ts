import fastify from "fastify";
import cors from '@fastify/cors'
import { prisma } from "./lib/prisma";
import { AppRoutes } from "./routes";

const app = fastify()

app.register(cors)
app.register(AppRoutes)



app.listen({
  port: 3333
}).then( () => {
  console.log('server running!')
})