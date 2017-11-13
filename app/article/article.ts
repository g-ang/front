export class Article {
    id: number;
    title: string;
    content: string;
    short_desc: string;
    labels: Label[];
}

export class Label{
    id: number;
    name: string;
}
