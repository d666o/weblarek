import { IProduct } from "../../types";

export class Products {
    protected list: IProduct[] = [];
    protected checkedItem: IProduct = <IProduct>{};

    setList(items: IProduct[]): void {
        this.list = items;
    };
    getList(): IProduct[] {
        return this.list;
    };
    getListItem(id: string): IProduct | undefined {
        return this.list.find(item => item.id === id);
    };
    setCheckedItem(item: IProduct | undefined): void {
        item && (this.checkedItem = item);
    };
    getCheckedItem(): IProduct {
        return this.checkedItem;
    };
};