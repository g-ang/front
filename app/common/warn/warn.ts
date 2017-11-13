export class Warn {
    public content: string;
    public isShow: boolean;
    public type: string;
    constructor() {
        this.content = "";
        this.isShow = false;
    }
    open(content: string, type?: string) {
        this.content = content;
        this.isShow = true;
        this.type = type;
        setTimeout(() => this.clean(), 3000);
    }

    alert(content: string) {
        this.open(content, "alert");
    }

    succ(content: string) {
        this.open(content, "succ");
    }

    fail(content: string) {
        this.open(content, "fail");
    }

    load(content: string) {
        this.open(content, "loading");
    }

    clean() {
        this.content = "";
        this.isShow = false;
    }
}
