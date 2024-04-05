import ejs from "ejs";
import hapi from "@hapi/hapi";
import vision from "@hapi/vision";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
async function init() {
    const server = hapi.server({
        port: 3000,
        host: "localhost"
    })

    await server.register(vision);

    server.views({
        engines: {
            ejs: ejs,
        },
        relativeTo: __dirname, // Corrigido o caminho relativo
        path: "public",
        compileOptions: {
            compileMode: "async",
        },
        isCached:true
    })

    server.route({
        path: "/",
        method: "GET",
        handler: (request, h) => {
            const data =  h.view("login", { nome: "luiz" })
            return data
        }
    })

    await server.start();
    console.log("server is running at 3000");

}

init();