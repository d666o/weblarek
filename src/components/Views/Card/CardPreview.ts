import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card";

interface ICardPreview extends ICard {
    category: string,
    image: string,
    description: string,
    buttonEnabled: boolean,
    buttonText: string
};
interface ICardPreviewActions {
    buttonHandler: () => void
};

export class CardPreview extends Card<ICardPreview> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected textElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardPreviewActions) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);
        if (actions?.buttonHandler) {
            container.removeEventListener('click', actions.buttonHandler);
            this.buttonElement.addEventListener('click', actions.buttonHandler);
        };
    };

    set category(value: string) {
        this.categoryElement.textContent = value;
        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(categoryMap[key as keyof typeof categoryMap], key === value);
        };
    };

    set image(value: string) {
        this.setImage(this.imageElement, CDN_URL + value, this.title);
    };

    set description(value: string) {
        this.textElement.textContent = value;
    };

    set buttonEnabled(value: boolean) {
        if (value) {
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.disabled = false;
        }
    };

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    };
};