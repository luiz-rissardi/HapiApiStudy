import { createPool } from "mysql2";
import { BaseICrud } from "./base/database.base.js";

export class MySqlDataBase extends BaseICrud {

    #client
    constructor(connectionString) {
        super()
        this.#client = createPool(connectionString)
    }

    async #connect() {
        try {
            const connection = await this.#client.promise().getConnection();
            return connection
        } catch (error) {
            throw new Error("não foi possive se conectar com o banco de dados")
        }
    }

    async findAll() {
        try {
            const connection = await this.#connect();
            const users = await connection.query("SELECT * FROM users");
            connection.release();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async insertOne(user) {
        try {
            const connection = await this.#connect();
            const result = await connection.query(`INSERT INTO users VALUES (?,?,?,?)`, [user.userName, user.idade, user.lastName, user.id])
            connection.release;
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateOne(userId, user) {
        try {
            const connection = await this.#connect();
            const result = await connection.query("UPDATE user SET userName=?,lastName=?,idade=? WHERE id = ? ",[user.userName,user.lastName,user.idade,userId]);
            connection.release();
            return result;
        } catch (error) {
            throw new Error(error.message);

        }
    }
}