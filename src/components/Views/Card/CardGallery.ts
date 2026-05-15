import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card";

interface ICardGallery extends ICard {
    category: string,
    image: string
};
interface ICardGalleryActions {
    selectCardHandler: () => void
};

export class CardGallery extends Card<ICardGallery> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardGalleryActions) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.buttonElement = this.container as HTMLButtonElement;
        if (actions?.selectCardHandler) this.buttonElement.addEventListener('click', actions.selectCardHandler);
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
};