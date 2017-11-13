import { Component, OnInit } from '@angular/core';
//import { Item } from './item';
import { msg } from './../../common/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EzItem, EzbuyService, Color, Size, Category } from './ezbuy.service';
import { materials } from './attrs';
import {EzConnect,Ws} from '../../common/ezbuy.connect';
@Component({
  selector: 'app-alibaibafastedit',
  templateUrl: './alibaibafastedit.component.html',
  styleUrls: ['./alibaibafastedit.component.css']
})
export class AlibaibafasteditComponent implements OnInit {
    down_url: string;
    item: EzItem;
    source_url: string;
    sourceListing = [];
    itemid: number;
    attrs: Color[] | Size[] | Category[];
    lefttop = 0; //左边浮动高度
    sizes: Size[];
    colors: Color[];
    myCategores = [];
    categores: Category[];
    materials = materials;

    //没有保存
    unSaveStatus = false;

    ngOnInit() {}
    constructor(private service: EzbuyService, private route: ActivatedRoute, private router: Router) {

        this.item = new EzItem();
        console.log(this.item);
        route.params.subscribe((params: Params) => {
            if (params["item_id"] > 0) {
                this.itemid = parseInt(params["item_id"]);
                this.get(this.itemid);
            } else {
                this.down_url = "";
            }
        });
        this.getMyCategorys();
    }

    getMyCategorys() {
        this.service.get("/api/ezbuy.mycategorys").subscribe((res: any) => {
            if (res.isSucc) {
                this.myCategores = <Category[]>res.items;
            }
        })
    }

    addCategory(cate) {
        this.service.post("/api/ezbuy.addmycategory", cate).subscribe((res: any) => {
            if (res.isSucc) {
                this.getMyCategorys();
            }
        })
    }

    upezbuy() {
        this.service.post("/api/ezbuy.export", { item_ids: [this.itemid] }).subscribe((re: any) => {
            if (re.isSucc) {
                console.log('生存exec ok,上传到ez...');
                let file_url = `http:\/\/g.com:8081/download/${re.data}`;
                console.log(file_url);
                EzConnect((conn: Ws) => {
                    conn.send('uploadExec', { url: file_url}, (re) => {
                        console.log(re);
                    });
                });
            } else {
                msg.error(re.error_msg);
            }
        })
    }

    getCategorys(e) {
        this.lefttop = 0;

        if (this.categores) {
            this.attrs = this.categores;
            return;
        }
        this.categores = [];
        this.service.get("/api/ezbuy.categorys").subscribe((res: any) => {
            if (res.isSucc) {
                for (let i in res.items) {
                    let item = <Category>res.items[i];
                    this.categores.push(new Category(item.id, item.name, 0));
                }
                this.attrs = this.categores;

            }
        })
    }

    get(item_id: number) {
        this.service.getItem(item_id).subscribe((res: any) => {
            if (res.isSucc) {
                this.item = <EzItem>res.item;
                if (this.item.materials.length > 0) {

                    this.item.materials.forEach((id, v) => {

                        for (let i in this.materials) {
                            let mat = this.materials[i];
                            if (mat.id == id) {
                                this.materials[i].checked = true;
                                return;
                            }
                        };
                    })

                }

            } else {
                msg.error(res.error_msg);
                this.item = new EzItem();
               
            }
        })
    }

    addColor() {
        if (this.item.colors == null) {
            this.item.colors = [new Color(0, "")];
        } else {
            this.item.colors.push(new Color(0, ""));
        }
    }

    addSize() {
        if (this.item.sizes == null) {
            this.item.sizes = [new Size(0, "")];
        } else {
            this.item.sizes.push(new Size(0, ""));
        }
    }

    paste() {
        if (this.item) {
            if (false == confirm("确定要从新PASTE吗？")) {
                return;
            }
        }

        this.service.paste(this.itemid).subscribe((res: any) => {
            if (res.isSucc) {
                this.get(this.itemid);
            } else {
                msg.error(res.error_msg);
            }
        })
    }

    save() {
        this.item.materials = [];
        this.materials.forEach((mat, i) => {
            if (mat.checked == true) {
                this.item.materials.push(mat.id);
            }
        });

        if (this.item.cid < 1) {
            msg.warn("请选择分类");
            return;
        }

        this.service.save(this.item).subscribe((res: any) => {
            if (res.isSucc) {

                this.unSaveStatus = false;

                msg.succ("保存成功");
            } else {
                msg.error(res.error_msg);
            }
        })
    }

    setAttr(att: Color | Size | Category) {
        if (att instanceof Color) {
            let color = <Color>att;

            for (let i in this.item.colors) {
                if (this.item.colors[i].name == color.name) {
                    this.item.colors[i].id = color.id;
                    return;
                } else if (this.item.colors[i].name == "") {
                    this.item.colors[i] = color;
                    return;
                }
            }
            this.item.colors.push(color);

        } else if (att instanceof Size) {
            let size = <Size>att;
            for (let i in this.item.sizes) {
                if (this.item.sizes[i].name == size.name) {
                    this.item.sizes[i].id = size.id;
                    return;
                } else if (this.item.sizes[i].name == "") {
                    this.item.sizes[i] = size;
                    return;
                }
            }
            this.item.sizes.push(<Size>att);
        } else if (att instanceof Category) {
            let cate = <Category>att;
            this.addCategory(cate);
            return;
        }
    }

    onColor(color: Color, e) {
        this.lefttop = e.clientY;
        if (this.colors) {
            this.attrs = this.colors;
            this.changeColor(color);
            return;
        }
        this.colors = [];
        this.service.get("/api/ezbuy.colors").subscribe((res: any) => {
            if (res.isSucc) {
                for (let i in res.items) {
                    let item = <Color>res.items[i];
                    this.colors.push(new Color(item.id, item.name));
                }
                this.attrs = this.colors;
                this.changeColor(color);
            }
        })
    }

    changeColor(color: Color) {
        if (this.colors && color.name != "") {
            this.attrs = <Size[]>[];
            for (let i in this.colors) {
                let curr = this.colors[i];
                if (curr.name == color.name) {
                    color.id = curr.id;
                    return;
                }
                if (curr.name.indexOf(color.name) > -1) {
                    this.attrs.push(curr);
                }
            }
        }
    }

    onSize(size: Size, e) {
        this.lefttop = e.clientY;
        if (this.sizes) {
            this.attrs = this.sizes;
            this.changeSize(size);
            return;
        }
        this.sizes = [];
        this.service.get("ezbuy.sizes").subscribe((res: any) => {
            if (res.isSucc) {
                for (let i in res.items) {
                    let item = <Size>res.items[i];
                    this.sizes.push(new Size(item.id, item.name));
                }
                this.attrs = this.sizes;
                this.changeSize(size);
            }
        })
    }

    changeSize(size: Size) {
        if (this.sizes && size.name != "") {
            this.attrs = <Size[]>[];
            for (let i in this.sizes) {
                let curr = this.sizes[i];

                if (curr.name == size.name) {
                    size.id = curr.id;

                }
                if (curr.name.indexOf(size.name) > -1) {
                    this.attrs.push(curr);
                }
            }
        }
    }

    removeAttr(attr: Color[] | Size[], index: number) {
        attr.splice(index, 1);
    }

    //ezbuy导出
    exportezbuy() {
        let itemids = <number[]>[this.item.itemid];
        this.service.post("/api/ezbuy.export", { item_ids: [this.itemid] }).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("操作成功");
                window.open(re.data);
            } else {
                msg.error(re.error_msg);
            }
        })
    }
    updateMaterial(mat: any) {
        if (mat.checked == false) {
            mat.checked = true;
        } else {
            mat.checked = false;
        }
    }
}
