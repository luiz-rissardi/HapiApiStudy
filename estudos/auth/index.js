

import Hapi from '@hapi/hapi';
import Boom from "@hapi/boom"
import bell from "@hapi/bell"
import jwtAuth from "hapi-auth-jwt2"
import { routes } from '../routes.js';
import dotenv from "dotenv";
import { decode } from 'jsonwebtoken';

dotenv.config();


// aqui criamos uma logica para validar a entrada de dados nas rotas usar nas estratégias
const teste = function (server, options) {
    return {
        /**u
         * @param { Hapi.ResponseObject } response 
         * @param { Hapi.ResponseToolkit } h 
         */
        authenticate: async (request, h) => {
            const dados = await options.validate(request, false)
            const credentials = { nome: "luiz" }
            if (dados) {
                return h.authenticated({ credentials: { nome: "luiz" } });
            } else {
                return h.unauthenticated(Boom.unauthorized('Bad auth'), credentials ? { credentials } : null)
            }
        }
    }
}

const start = async () => {

    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });


    // aqui criamos definitivamente um schema para ser usado 
    // server.auth.scheme("teste", teste)

    // server.auth.strategy("custom", "teste", {
    //     validate: (request, isValid) => {
    //         // logica de codigo;
    //         return { isValid }
    //     }
    // })

    // aqui criamos um a estrategia de autenticação para o JWT. lib -> hapi-auth-jwt2
    await server.register(jwtAuth);

    server.auth.strategy("jwt", "jwt", {
        key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NDIzNzg0MjM0NTIzNDYyM3NkZnNkZjU0JEBAQCVANzEzMnYzMmQ1ZHNkamFzcnc3ZHNmc2R2ZmJzZGZ5ZHVmeXNkZmJ4eGMlKiZAJSFAI2pnc2pkZmdqc2Zyd2VyMjM0MjM0NjM0NjQ0NjQ2NDY0NDgzNHZkYmR1ZGk4MkBAQlZHRkRGZnNkZ2ZzZGZzNSJ9._ihTIY0QZ_KbPw7u1TuZOqgsdNe8SrshSDbyaY7P2dM",
        verifyOptions: {
            algorithms: ["HS256"] // padrão
        },
        validate(decoded, request, h) {
            console.log(decoded);
            return { isValid: true };

        }
    })

    // server.auth.default("jwt")

    //crinado auth para o google
    await server.register(bell)
    server.auth.strategy("google", "bell", {
        provider: 'google',
        password: 'tterg77idyfysigfergtherhtgdysdfsfysiuergwegrwer423423EWGE8D8FSDN3ERWwe2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        isSecure: false
    })

    server.auth.default("google")
    server.route(routes);

    await server.start();

    console.log('server running at: ' + server.info.uri);
};

start();