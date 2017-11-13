let stock = <MyHistory[]>[];

export class MyHistory {
    public data: string[];
    constructor() {
        this.data = [];
    }
}

export function historyStock(flag: string): MyHistory {
    if (stock[flag] == undefined) {
        stock[flag] = new MyHistory();
    }
    return stock[flag];
}