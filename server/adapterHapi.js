

/**
 * 
 * @param {Function} fn 
 * @returns any 
 */

export function adapt(fn) {
    return async function (request, h) {
        const body = request.payload !== undefined ? JSON.parse(request.payload):null;
        const { result, code } = await fn.apply(fn, [request.params,body]);
        return h.response({
            result,
            code
        });
    }
}