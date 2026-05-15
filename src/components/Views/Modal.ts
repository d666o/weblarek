import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement
};

export class Modal extends Component<IModal> {
    protected contentElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.buttonElement.addEventListener('click', () => this.cl());
        this.container.addEventListener('click', (el) => el.target === this.container && this.cl());
    }

    set content(item: HTMLElement) {
        this.contentElement.appendChild(item);
    };

    op(): void {
        this.container.classList.add('modal_active');
    };

    cl(): void {
        this.contentElement.innerHTML = '';
        this.container.classList.remove('modal_active');
    };
};