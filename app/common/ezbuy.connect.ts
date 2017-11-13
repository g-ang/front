import { Ws } from './ws';

//ezcli
let ezConnect: Ws;

export { Ws };

export function EzConnect(callback?: (conn: Ws) => void): void{
    if (ezConnect != null && ezConnect.isOpen) {
        if (callback != undefined) {
            callback(ezConnect);
        }
    }
    ezConnect = new Ws("wss://local.51helper.com:1826/cli");
    ezConnect.watch("open", () => {
        callback(ezConnect);
    });
}


