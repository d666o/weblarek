import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
    protected list: IProduct[] = [];
    protected checkedItem: IProduct | null = null;
    protected events?: IEvents;

    constructor(events?: IEvents) {
        this.events = events;
    };

    setList(items: IProduct[]): void {
        this.list = items;
        this.events?.emit('products:change', {items: this.list});
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
        this.events?.emit('checkedProduct:change', {item});
    };
    
    getCheckedItem(): IProduct | null {
        return this.checkedItem;
    };
};