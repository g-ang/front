export class Storage {
    first: string;

    constructor(first: string) {
        this.first = first;
    }

    set(k: string, v: string) {
        getLocalStorage().setItem(this.first + k, v);
    }

    get(k: string): any {
        if (getLocalStorage().getItem(this.first + k)) {
            return getLocalStorage().getItem(this.first + k);
        }
        return null;
    }

    setJSON(k: string, v: any) {
        getLocalStorage().setItem(this.first + k, JSON.stringify(v));
    }

    getJSON(k: string): any {
        if (getLocalStorage().getItem(this.first + k)) {
            return JSON.parse(localStorage.getItem(this.first + k));
        }
        return null;
    }
}

function getLocalStorage() {
    if (typeof localStorage == 'undefined') {
        return new emptyLocalStorage();
    } else {
        return localStorage;
    }
}

class emptyLocalStorage {
    getItem(index: string){}
    setItem(index: string, value: string) {}
}
