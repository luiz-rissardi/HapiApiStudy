import Hapi from "@hapi/hapi";
import dotenv from "dotenv"

import { UserRoutes } from "./routes/user.routes.js";
import { Factory } from "./factory/factory.js";

async function init() {

    dotenv.config();
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    })

    const userController = await Factory.getInstance();
    const userRoutes = new UserRoutes(userController);
    server.route([
        ...userRoutes.mapRoutes(userRoutes.getMethods())
    ])
    await server.start();
    console.log("server is running at 3000");
}

init();