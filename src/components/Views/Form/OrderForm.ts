import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form, IForm } from "./Form";

type TOrderForm = Pick<IBuyer, 'payment' | 'address'>;
export interface IOrderForm extends TOrderForm, IForm {};

export class OrderForm extends Form<IOrderForm> {
    protected onlineButtonElement: HTMLButtonElement;
    protected cashButtonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);
        this.onlineButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.onlineButtonElement.addEventListener('click', () => {
            this.events.emit(`${this.formElement.name}:change`, {payment: 'online'});
        });
        this.cashButtonElement.addEventListener('click', () => {
            this.events.emit(`${this.formElement.name}:change`, {payment: 'cash'});
        });
    };

    set payment(value: 'online' | 'cash' | null) {
        this.onlineButtonElement.classList.toggle('button_alt-active', value === 'online');
        this.cashButtonElement.classList.toggle('button_alt-active', value === 'cash');
    };

    set address(value: string) {
        ensureElement<HTMLInputElement>('input[name="address"]', this.container).value = value;
    };
};