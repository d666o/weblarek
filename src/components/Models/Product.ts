import { IProduct } from "../../types";

export class Products {
    protected list: IProduct[] = [];
    protected checkedItem: IProduct | null = null;

    setList(items: IProduct[]): void {
        this.list = items;
    };
    getList(): IProduct[] {
        return this.list;
    };
    getListItem(id: string): IProduct | null {
        const item = this.list.find(item => item.id === id);
        return item ? item : null;
    };
    setCheckedItem(item: IProduct | null): void {
        this.checkedItem = item;
    };
    getCheckedItem(): IProduct | null {
        return this.checkedItem;
    };
};