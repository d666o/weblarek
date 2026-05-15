import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    price: number,
    items: HTMLElement[],
    buttonEnabled: boolean
};

export class Basket extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('basket:order');
        });
    };

    set price(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    };

    set buttonEnabled(value: boolean) {
        this.buttonElement.disabled = !value;
    };

    set items(items: HTMLElement[]) {
        this.listElement.innerHTML = '';
        items.forEach(item => {
            this.listElement.appendChild(item);
        });
    };
};