import Hapi from "@hapi/hapi";

async function init(){
    const server = Hapi.server({
        port:3000,
        host:"localhost"
    })

    server.route({
        path:"/",
        method:"GET",
        handler: function(request,h){
            return {
                nome:"luiz",
                idade:18
            }
        }
    })

    await server.start();
    console.log("server is running at 3000");
}

init()