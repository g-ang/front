import {Component, Input, Output as Out, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ScreenComponent }    from './screen.component';
import { MyHistory} from './history';
import {TreeNode} from '../../common/treenode';
@Component({
    templateUrl: './text.component.html',
})

export class TextComponent implements ScreenComponent, OnInit, OnChanges {
    @Input('data') data: string;
    @Input('data_type') data_type: string;
    @Input('appid') appid: string;
    @Input() history: MyHistory;

    item: TreeNode[];
    selectedNode: TreeNode;
    curr_index: number;
    curr_itemindex: number;
    constructor() { }

    ngOnInit() {
        this.history.data.splice(0, 0, this.data);

        if (this.data_type == 'json') {
            this.showItem();
        }

    }

    ngOnChanges(e) { }

    cleanHistorys() {
        this.history.data = [];
    }

    showItem() {
        let data=JSON.parse(this.data);
        this.item = this.getChildTree(data);
    }

    getChildTree(data: any): TreeNode[] {
        let children = [];
        for (let f in data) {
            let t = <string>typeof data[f];
            if (t == 'object') {
                let childrenNode = this.getChildTree(data[f]);

                let isArray = Array.isArray(data[f]);
                console.log(data[f].toString());
                if (childrenNode.length) {
                    if (isArray) {
                        t = `Array(${childrenNode.length})`;
                    } else {
                        t = `object(${childrenNode.length})`;
                    }
                } else {
                    if (isArray) {
                        t = `object(0)`;
                    } else {
                        t = `Array(0)`;
                    }
                }

                let node = { name: f, value: ' ', type: t }
                children.push({
                    data: node, children: childrenNode,
                });
            } else {
                let node = { name: f, value: data[f], type: t }
                children.push({
                    data: node,
                    leaf: true,
                });
            }
        }
        return children;
    }
}