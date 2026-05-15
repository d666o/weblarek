import { IBuyer } from "../../../types"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events"
import { Form, IForm } from "./Form"

type TContactsForm = Pick<IBuyer, 'phone' | 'email'>;
export interface IContactsForm extends TContactsForm, IForm {};

export class ContactsForm extends Form<IContactsForm> {
    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);
    };

    set phone(value: string) {
        ensureElement<HTMLInputElement>('input[name="phone"]', this.container).value = value;
    };

    set email(value: string) {
        ensureElement<HTMLInputElement>('input[name="email"]', this.container).value = value;
    };
};