import { randomUUID as v4 } from "crypto"

export class UserController {

    repository;
    constructor(repository) {
        this.repository = repository;
    }

    async getAll(params, body) {
        try {
            const result = await this.repository.findAll();
            return {
                 result,
                 code:200
            }
        } catch (error) {
            return {
                result: "não foi possivel buscar todos os usuarios",
                code: 500
            }
        }
    }

    async create(params,body){
        try {
            const user = body;
            user["id"] = v4();
            await this.repository.insertOne(user);
            return{
                result:"usuario criado com sucesso",
                code:201
            }
        } catch (error) {
            console.log(error);
            return {
                result: "não foi possivel criar novo usuario",
                code: 500
            }
        }
    }

    async update(params,body){
        try {
            const user = body;
            const { userId } = params;
            await this.repository.updateOne(userId,user);
            return{
                result:"usuario atualizado com sucesso",
                code:201
            }
        } catch (error) {
            console.log(error);
            return {
                result: "não foi possivel criar novo usuario",
                code: 500
            }
        }
    }
}