import { IProduct } from "../../types";

export class Cart {
    protected list: IProduct[] = [];

    getList(): IProduct[] {
        return this.list;
    };
    addItem(item: IProduct): void {
        this.list.push(item);
    };
    removeItem(item: IProduct): void {
        this.list = this.list.filter(product => product.id !== item.id);
    };
    clearList(): void {
        this.list = [];
    };
    getTotalAmount(): number {
        return this.list.reduce((accum, item) => item.price !== null ? accum += item.price : accum, 0);
    };
    getItemsCount(): number {
        return this.list.length;
    };
    isExist(id: string): boolean {
        return this.list.find(item => item.id === id) ? true : false;
    };
};