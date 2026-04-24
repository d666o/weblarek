import { IBuyer, TBuyerErrors } from "../../types";

export class Buyer {
    protected info: IBuyer = {
        payment: null,
        address: '',
        email: '',
        phone: ''
    };

    setInfo(item: Partial<IBuyer>): void {
        this.info = { ...this.info, ...item };
    };
    
    getInfo(): IBuyer {
        return this.info;
    };
    
    clearInfo(): void {
        this.info = { payment: null, address: '', email: '', phone: '' };
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