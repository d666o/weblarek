import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IOrder {
    totalPrice: number
};

export class Order extends Component<IOrder> {
    protected totalPriceElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.totalPriceElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('order:close');
        });
    };

    set totalPrice(value: number) {
        this.totalPriceElement.textContent = `Списано ${value} синапсов`;
    };
};