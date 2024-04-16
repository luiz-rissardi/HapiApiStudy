

/**
 * 
 * @param {Function} fn 
 * @returns any 
 */

export function adapt(fn) {
    return async function (request, h) {
        const body = request.payload !== undefined ? request.payload : {}
        const { result, code } = await fn.apply(fn, [request.params, body]);
        return h.response({
            result,
            code
        });
    }
}