export const routes = [
    {
        path: "/user",
        method: "GET",
        handler: (request, h) => {
            if(request.auth.isAuthenticated){
                console.log(request.auth);
                return {
                    name: "luiz",
                    id: 1
                }
            }else{
                return h.response('Unauthorized').code(401);
            }
        }
    },
    {
        path: "/user",
        method: "POST",
        handler: (request, h) => {
            return "usuario inserido com sucesso"
        }
    }
]