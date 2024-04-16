import Hapi from "@hapi/hapi";
import Joi from "joi";

async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });

    server.route([
        {
            path: "/user",
            method: "POST",
            handler: (request, h) => {
                const data = request.payload;
                return data
            },
            options: {
                validate: {
                    // validações com o JOI no payload -> POST
                    payload: Joi.object({
                        userName: Joi.string().min(1).max(10).required(),
                        idade:Joi.number().required()
                    })
                }
            }
        }
    ])

    await server.start();
    console.log("server is running is 3000");
}

init();