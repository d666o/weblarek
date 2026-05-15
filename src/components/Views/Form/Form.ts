import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface IForm {
    errors: string,
    buttonEnabled: boolean
};

export abstract class Form<T> extends Component<T> {
    protected submitButtonElement: HTMLButtonElement;
    protected errorElement: HTMLElement;
    protected formElement: HTMLFormElement;
    protected inputElements: HTMLInputElement[];

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.submitButtonElement = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.formElement = container as HTMLFormElement;
        this.inputElements = ensureAllElements<HTMLInputElement>('.form__input', this.container);
        this.formElement.addEventListener('submit', event => {
            event.preventDefault();
            this.events.emit(`${this.formElement.name}:submit`);
        });
        this.inputElements.forEach(item => {
            item.addEventListener('input', event => {
                const { name, value } = event.target as HTMLInputElement;
                this.events.emit(`${this.formElement.name}:change`, {[name]: value});
            });
        });
    };

    set errors(value: string) {
        this.errorElement.textContent = value;
    };

    set buttonEnabled(value: boolean) {
        this.submitButtonElement.disabled = !value;
    };
};