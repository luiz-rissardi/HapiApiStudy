import { MongoClient } from "mongodb";
import { BaseICrud } from "./base/database.base.js";

export class MongoDataBase extends BaseICrud {
    #client;
    constructor(connectionString) {
        super();
        this.#client = new MongoClient(connectionString, {
            maxPoolSize: 10
        })
    }

    async #connect() {
        try {
            await this.#client.connect()
            return this.#client.db("festajunina").collection("users")
        } catch (error) {
            throw new Error("não foi possivel se conectar com o banco")
        }
    }

    async findAll() {
        try {
            const collection = await this.#connect();
            const users = collection.find().toArray();
            return users
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async insertOne(user) {
        try {
            const collection = await this.#connect();
            const result = await collection.insertOne({
                ...user,
                _id: null
            })
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateOne(userId, user) {
        try {
            const collection = await this.#connect();
            const result = await collection.updateOne(
                { id: userId },
                { $set: user }
            )
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }
}