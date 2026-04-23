import { IBuyer, IValidate } from "../../types";

export class Buyer {
    protected info: IBuyer = {
        payment: 'Не выбран вид оплаты',
        address: 'Необходимо указать адрес',
        email: 'Необходимо указать Email',
        phone: 'Необходимо указать телефон'
    };

    setInfo(item: IBuyer): void {
        this.info.payment = item.payment
        this.info.address = item.address
        this.info.email = item.email
        this.info.phone = item.phone
    };
    getInfo(): IBuyer {
        return this.info;
    };
    clearInfo(): void {
        this.info = <IBuyer>{};
    };
    validateInfo(): IValidate | true {
        const validate: IValidate = {};
        this.info.payment === 'Не выбран вид оплаты' && (validate['payment'] = this.info.payment);
        this.info.address === 'Необходимо указать адрес' && (validate['address'] = this.info.address);
        this.info.email === 'Необходимо указать Email' && (validate['email'] = this.info.email);
        this.info.phone === 'Необходимо указать телефон' && (validate['phone'] = this.info.phone);
        return Object.keys(validate).length === 0 ? true : validate;
    };
};