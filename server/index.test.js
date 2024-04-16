import assert from "assert";
import { init } from "./index.js";
import { describe, it, before } from "node:test"
import res from "express/lib/response.js";

describe("suite de testes da api de usuários", function () {
    let app;
    before(async () => {
        app = await init();
    })

    it("teste get users", async function () {
        const result = await app.inject({
            url: "/users",
            method: "GET"
        })

        const dados = JSON.parse(result.payload);
        assert.deepEqual(dados.code, 200)
        assert.ok(Array.isArray(dados.result))
    })

    it("teste post users", async function () {
        const body = {
            id: 4,
            userName: "ana luizxza",
            lastName: "rissadias",
            idade: 25
        }
        const result = await app.inject({
            url: "/users",
            method: "POST",
            payload: body
        })

        const dados = JSON.parse(result.payload);
        assert.deepEqual(dados.code, 201);
        assert.deepEqual(dados.result, "usuario criado com sucesso");
    })

    it("teste update users", async () => {
        const body = {
            id:"15a08bd2-7983-469a-bd62-972257ef8a58",
            userName:"larissinha",
            lastName:"hatchBack",
            idade:15
        };

        const result = await app.inject({
            url:"/users/"+body.id,
            method:"PUT",
            payload:body
        })
        const dados = JSON.parse(result.payload);

        assert.deepEqual(dados.code,201);
        assert.deepEqual(dados.result,"usuario atualizado com sucesso")
    })


})