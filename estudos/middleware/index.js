import Hapi from "@hapi/hapi";
import { routes } from "../routes.js";
import { markEndOfRequest, markStartOfRequest } from "./middlewares.js";

async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });

    // esse middleware irá executar em todas as rotas
    server.ext("onRequest", markStartOfRequest)

    server.ext("onPostResponse", markEndOfRequest)

    // aqui vemos um middleware que afeta somente essa rota
    server.route({
        path: "/client",
        method: "GET",
        handler: (request, h) => {
            return "deu certo"
        },
        options: {
            pre: [
                {
                    method: (request, h) => {
                        console.log("antes da rota");
                        return h.continue;
                    },
                    assign:"onRequest"
                }
            ]
        }
    })

    server.route(routes);

    await server.start();
    console.log("server is running");
}

init();