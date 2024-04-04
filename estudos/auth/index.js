

import Hapi from '@hapi/hapi';
import Boom from "@hapi/boom"
import bell from "@hapi/bell"
import jwtAuth from "hapi-auth-jwt2"
import { routes } from '../routes.js';
import dotenv from "dotenv";

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
    server.auth.scheme("teste", teste)

    server.auth.strategy("custom", "teste", {
        validate: (request, isValid) => {
            // logica de codigo;
            return { isValid }
        }
    })

    // aqui criamos um a estrategia de autenticação para o JWT. lib -> hapi-auth-jwt2
    await server.register(jwtAuth);

    server.auth.strategy("jwt", "jwt", {
        key: "ydbex62gb7dsbGDBD7g3edshsyd66gdyaysbddysgvy6666234djshs673$@dd#@!%@#$@usvbwdh",
        verifyOptions: {
            algorithms: ["HS256"] // padrão
        },
        validate(decoded, h) {
            return { isValid: true }
        }
    })

    // crinado auth para o google
    await server.register(bell)
    server.auth.strategy("google", "bell", {
        provider: 'google',
        password: 'tterg77idyfysigfergtherhtgdysdfsfysiuergwegrwer423423EWGE8D8FSDN3ERWwe2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        isSecure: false
    })

    server.route(routes);

    await server.start();

    console.log('server running at: ' + server.info.uri);
};

start();