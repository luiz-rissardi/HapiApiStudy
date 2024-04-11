export class BaseRoutes {
    getMethods() {
        return Object.getOwnPropertyNames(this.__proto__)
            .filter(methodName => methodName !== "constructor" && !methodName.startsWith("#"))
    }

    mapRoutes(methods) {
        return methods.map(method => this[method].apply(this))
    }
}