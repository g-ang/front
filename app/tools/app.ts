export class App {
    constructor(
        public id: any,
        public code: string,
        public name: string,
        public request: Request,
        public seo: Seo,
        public screen: Screen,
        public output: Output) {

    }
}

export class Request {
    addr: string;
    method: string;
    header: Header;
    constructor() {
        this.header = new Header();
    }
}

export class Header {
    params = [];
    add(attr: Attr) {
        this.params.push({ name: attr.label, value: attr.value });
    }

    del(index: number) {
        this.params.splice(index, 1);
    }
}

export class Seo {
    title: string;
    descript: string;
    keyword: string;

    constructor() {
        this.title = "";
        this.descript = "";
        this.keyword = "";
    }
}

export class Screen {
    elements: Element[];
}

export class Output {
    data_type: string;
    screen: string;
}

//文本格式选项
export function OutputDatatypeOption(screen_type: string): any[] {
    if (screen_type == 'text') {
        return [{ name: 'text', desc: '普通数据' }, { name: "json", desc: 'JSON数据' }];
    } else if (screen_type == 'photo') {
        return [{
            name: 'default', desc: `
        <pre>
            var data=[{
                title: string;
                small_url: string;
                url: string;
                intro: string;
            }]
        </pre>`}];
    }
}

//output
export function OutputScreenOption(): string[] {
    return ["text", "photo"];
}

export class Attr {
    label: string;
    value: string;
    disableEdit: boolean;
    disableDel: boolean;
    constructor(label: string, value: any, disableDel?: boolean, disableEdit?: boolean) {
        this.label = label;
        this.value = value;
        if (disableDel == undefined) {
            this.disableDel = false;
        }

        if (disableEdit == undefined) {
            this.disableEdit = false;
        }
    }
}

export class Element {
    type: string;
    name: string;
    value: any;
    label: string;
    placeholder: string;

    attrs: Attr[];
    private disableOption = [];
    constructor(type: string) {
        this.type = type;
        this.attrs = [];
        this.name = '';
        this.value = '';
        this.label = '';
        this.placeholder = '';
    }

    disable(a: string[]) {
        this.disableOption = a;
    }

    isDis(name: string): boolean {
        return this.disableOption.indexOf(name) > -1;
    }

    disableAll() {
        this.disable(['placeholder', 'attrs', 'label', 'value', 'name']);
    }

    set(label: string, value: any, disableDel?: boolean, disableEdit?: boolean): Element {

        if (undefined == value) {
            value = "";
        }

        let attr = new Attr(label, value, disableDel, disableEdit);
        this.attrs.push(attr);
        return this;
    }

    addAttr(attr: Attr): Element {
        this.attrs.push(attr);
        return this;
    }

    setall(attrs: any[][]): Element {

        attrs.forEach(att => {
            this.set(att[0], att[1]);
        })
        return this;
    }
}