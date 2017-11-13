export class Ws {
    conn: WebSocket;
    call = [];
    isOpen = false;
    error: Function;
    constructor(url: string,param?:any) {
        this.conn = new WebSocket(url);
        //监听消息
        this.conn.onmessage = (event: any) => {
            var re = JSON.parse(event.data);
            if (this.call[re.cmd] != undefined) {
                this.call[re.cmd](re.args);
            }
        };

        //close
        this.conn.onclose = () => {
            this.isOpen = false;
            this.echo("连接断开");
        };

        this.conn.onerror = (err) => {
            if (param['error'] != undefined) {
                param['error'](err);
            }
        }

        //open
        this.conn.onopen = () => {
            this.isOpen = true;
            this.echo("连接服务器成功");
            if (this.call["open"] != undefined) {
                this.call["open"]();
            }
        };
    }

    echo(msg) {
        console.log(msg);
    }

    send(name, arge, callback?: Function){
        var command = { "cmd": name, "args": arge };
        if (callback != undefined) {
            this.watch(name, callback);
        }
        this.conn.send(JSON.stringify(command));
    }

    watch(name: string, fun: Function) {
        this.call[name] = fun;
    }
}
