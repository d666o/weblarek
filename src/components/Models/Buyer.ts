import { IBuyer, TBuyerErrors } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
    protected info: IBuyer = {
        payment: null,
        address: '',
        email: '',
        phone: ''
    };
    protected events?: IEvents;

    constructor(events?: IEvents) {
        this.events = events;
    };

    setInfo(item: Partial<IBuyer>): void {
        this.info = { ...this.info, ...item };
        this.events?.emit('buyer:change', {info: this.info});
    };
    
    getInfo(): IBuyer {
        return this.info;
    };
    
    clearInfo(): void {
        this.info = { payment: null, address: '', email: '', phone: '' };
        this.events?.emit('buyer:change');
    };
    
    validateInfo(): TBuyerErrors {
        const errors: TBuyerErrors = {};
        this.info.payment === null && (errors.payment = 'Не выбран вид оплаты');
        !this.info.address.trim() && (errors.address = 'Необходимо указать адрес');
        !this.info.email.trim() && (errors.email = 'Необходимо указать Email');
        !this.info.phone.trim() && (errors.phone = 'Необходимо указать телефон');
        return errors;
    };
};