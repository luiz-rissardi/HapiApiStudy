
import { AsyncLocalStorage } from "async_hooks"
import { PerformanceObserver, performance } from "perf_hooks"
import { appendFile } from "fs/promises";
import { randomUUID } from "crypto";



const aysncStorage = new AsyncLocalStorage();

const observer = new PerformanceObserver((mark) => {
    const [{ name, duration }] = mark.getEntries();
    performance.clearMarks(name);
    appendFile("logger.log", `name: ${name},duration: ${duration}\n`)
})

observer.observe({ entryTypes: ["measure"] })

function logRequest(msg) {
    const { randomId } = aysncStorage.getStore();
    const start_mark = `START => the client send a request ${randomId}`
    const end_mark = `END => the client finished a request ${randomId}`
    if (msg == "start") {
        performance.mark(start_mark);
    }

    if (msg == "end") {
        performance.mark(end_mark);
        performance.measure(`REQUEST => ${randomId}`, start_mark, end_mark);
    }

}


// middlewares para medir o tempo da duração da requisição 
export function markStartOfRequest(request, h) {
    aysncStorage.enterWith({ request, repsonse: h, randomId: randomUUID() })
    logRequest("start")
    return h.continue
}

export function markEndOfRequest(request, h) {
    logRequest("end");
    return h.continue;
}