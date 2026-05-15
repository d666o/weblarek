import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    protected list: IProduct[] = [];
    protected events?: IEvents;

    constructor(events?: IEvents) {
        this.events = events;
    };

    getList(): IProduct[] {
        return this.list;
    };
    
    addItem(item: IProduct | null): void {
        if (item !== null) {
            this.list.push(item);
            this.events?.emit('cart:change', {items: this.list, totalAmount: this.getTotalAmount()});
        };
    };
    
    removeItem(id: string): void {
        this.list = this.list.filter(product => product.id !== id);
        this.events?.emit('cart:change', {items: this.list, totalAmount: this.getTotalAmount()});
    };
    
    clearList(): void {
        this.list = [];
        this.events?.emit('cart:change', {items: this.list, totalAmount: this.getTotalAmount()});
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