import { BaseRoutes } from "./base/routes.base.js";
import { adapt } from "../adapterHapi.js";

export class UserRoutes extends BaseRoutes {

    #controller;
    constructor(controller) {
        super();
        this.#controller = controller;
    }

    list() {
        return {
            path: "/users",
            method: "GET",
            handler: adapt(this.#controller.getAll.bind(this.#controller))
        }
    }

    create() {
        return {
            path: "/users",
            method: "POST",
            handler: adapt(this.#controller.create.bind(this.#controller))
        }
    }

    update(){
        return {
            path: "/users/{userId}",
            method: "PUT",
            handler: adapt(this.#controller.update.bind(this.#controller))
        }
    }
}