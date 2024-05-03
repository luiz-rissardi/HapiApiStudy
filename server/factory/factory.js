import { MySqlDataBase } from "../database/mysql.db.js";
import { MongoDataBase } from "../database/mongo.db.js";
import { ContextRepository } from "../repository/contextRepository.js";
import { UserController } from "../controller/controller.js";

export class Factory {
    static async getInstance() {
        const isProd = process.env.PROD == "true" ? true : false;
        let database;
        if (isProd) {
            database = new MySqlDataBase(process.env.MYSQL_CONNECTION_STRING)
        } else {
            database = new MongoDataBase(process.env.MONGO_CONNECTION_STRING)
        }
        const repository = new ContextRepository(database);
        return new UserController(repository);
    }
}


