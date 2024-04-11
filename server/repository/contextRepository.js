import { BaseICrud } from "../database/base/database.base.js";


export class ContextRepository extends BaseICrud {

    #databaseContext
    constructor(contextStrategy){
        super();
        this.#databaseContext = contextStrategy;
    }

    async findAll(){
        return await this.#databaseContext.findAll();
    }

    async insertOne(user){
        return await this.#databaseContext.insertOne(user);
    }

    async updateOne(userId,user){
        return await this.#databaseContext.updateOne(userId,user);
    }
}