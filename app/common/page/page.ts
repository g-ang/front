export class Page {
    offset: number;
    rowcount: number;

    constructor(offset: number, rowcount: number) {
        this.offset = offset;
        this.rowcount = rowcount;
    }
}