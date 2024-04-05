import Hapi from "@hapi/hapi";
import hapiRateLimit from "hapi-rate-limit";

async function init(){
    const server = Hapi.server({
        port:3000,
        host:"localhost"
    });

    await server.register({
        plugin:hapiRateLimit,
        options:{
            userLimit:5,
            userCache: {
                expiresIn: 60000 
            },

        }
    })

    server.route({
        path:"/user",
        method:"GET",
        handler:(request,h)=>{
            return "ola mundo"
        }
    })


    await server.start();
    console.log("server is running at 3000");
}
~
init();