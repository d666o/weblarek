import { IProduct } from "../../types";

export class Cart {
    protected list: IProduct[] = [];

    getList(): IProduct[] {
        return this.list;
    };
    
    addItem(item: IProduct | null): void {
        item !== null && this.list.push(item);
    };
    
    removeItem(id: string): void {
        this.list = this.list.filter(product => product.id !== id);
    };
    
    clearList(): void {
        this.list = [];
    };
    
    getTotalAmount(): number {
        return this.list.reduce((accum, item) => accum + (item.price || 0), 0);
    };
    
    getItemsCount(): number {
        return this.list.length;
    };
    
    isExist(id: string): boolean {
        return this.list.some(item => item.id === id);
    };
};