import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card";

interface ICardBasket extends ICard {
    index: number
};
interface ICardBasketActions {
    removeItem: () => void
};

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardBasketActions) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        if (actions?.removeItem) this.buttonElement.addEventListener('click', actions.removeItem);
    };

    set index(value: number) {
        this.indexElement.textContent = String(value);
    };
};