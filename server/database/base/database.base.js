class NotImplementedException extends Error {
    constructor() {
        super("method not implemented");
        this.name = "NotImplementedException"
    }
}

export class BaseICrud {

    findAll() {
        throw new NotImplementedException();
    }

    insertOne(user) {
        throw new NotImplementedException();
    }

    updateOne(userId,user) {
        throw new NotImplementedException();
    }
}