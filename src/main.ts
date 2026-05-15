import { Api } from './components/base/Api';
import { ApiCommunication } from './components/ApiCommunication';
import { Buyer } from './components/Models/Buyer';
import { Cart } from './components/Models/Cart';
import { Products } from './components/Models/Product';
import './scss/styles.scss';
import { IOrder, IProduct } from './types';
import { API_URL } from './utils/constants';
import { Gallery } from './components/Views/Gallery';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardGallery } from './components/Views/Card/CardGallery';
import { EventEmitter } from './components/base/Events';
import { Header } from './components/Views/Header';
import { Modal } from './components/Views/Modal';
import { Basket } from './components/Views/Basket';
import { CardPreview } from './components/Views/Card/CardPreview';
import { IOrderForm, OrderForm } from './components/Views/Form/OrderForm';
import { ContactsForm, IContactsForm } from './components/Views/Form/ContactsForm';
import { Order } from './components/Views/Order';
import { CardBasket } from './components/Views/Card/CardBasket';

const events = new EventEmitter();
const products = new Products(events);
const cart = new Cart(events);
const buyer = new Buyer(events);
const api = new Api(API_URL);
const apiService = new ApiCommunication(api);
apiService.getProductList().then(result => products.setList(result.items)).catch(e => console.log(e));
const wrapper = ensureElement<HTMLElement>('.page__wrapper');
const header = new Header(events, wrapper);
const gallery = new Gallery(wrapper);
const modal = new Modal(events, ensureElement('#modal-container'));
const cardPreview = new CardPreview(cloneTemplate('#card-preview'), {buttonHandler: () => events.emit('cardPreview:action')});
const basket = new Basket(events, cloneTemplate('#basket'));
const orderForm = new OrderForm(events, cloneTemplate('#order'));
const contactsForm = new ContactsForm(events, cloneTemplate(('#contacts')));
const order = new Order(events, cloneTemplate('#success'));

events.on('basket:remove', (product: IProduct) => {
    cart.removeItem(product.id);
    modal.cl();
});
events.on('basket:add', (product: IProduct) => {
    cart.addItem(product);
    modal.cl();
});
events.on('basket:open', () => {
    modal.content = basket.render();
    modal.op();
});
events.on('basket:order', () => {
    modal.cl();
    modal.content = orderForm.render();
    modal.op();
});
events.on('order:change', (data: Partial<IOrderForm>) => {
    buyer.setInfo(data);
});
events.on('order:submit', () => {
    modal.cl();
    modal.content = contactsForm.render();
    modal.op();
});
events.on('contacts:change', (data: Partial<IContactsForm>) => {
    buyer.setInfo(data);
});
events.on('contacts:submit', () => {
    const data: IOrder = {
        ...buyer.getInfo(),
        total: cart.getTotalAmount(),
        items: cart.getList().map(item => item.id)
    };
    apiService.postOrder(data)
        .then(result => {
            modal.cl();
            modal.content = order.render({totalPrice: result.total});
            modal.op();
            cart.clearList();
            buyer.clearInfo();
        })
        .catch(e => console.log(e));
});
events.on('order:close', () => {
    modal.cl();
});
events.on('card:select', (product: IProduct) => {
    products.setCheckedItem(product);
});
events.on('products:change', () => {
    gallery.catalog = products.getList().map(item => new CardGallery(cloneTemplate('#card-catalog'), {selectCardHandler: () => events.emit('card:select', item)}).render(item));
});
events.on('cardPreview:action', () => {
    const checkedProduct = products.getCheckedItem();
    if (checkedProduct) {
        cart.isExist(checkedProduct.id) ? cart.removeItem(checkedProduct.id) : cart.addItem(checkedProduct);
        modal.cl();
    };
});
events.on('checkedProduct:change', (data: {item: IProduct}) => {
    const product = data.item;
    let text = '';
    if (cart.isExist(product.id)) text = 'Удалить из корзины'
    else text = 'Купить';
    if (product.price === null) text = 'Недоступно';
    modal.content = cardPreview.render({...product, buttonEnabled: product.price, buttonText: text});
    modal.op();
});
events.on('cart:change', () => {
    const cartList = cart.getList();
    const cards = cartList.map((product, index) => {
        const cardBasket = new CardBasket(cloneTemplate('#card-basket'), {removeItem: () => events.emit('basket:remove', product)});
        cardBasket.index = index + 1;
        return cardBasket.render(product);
    });
    basket.render({items: cards, price: cart.getTotalAmount(), buttonEnabled: cartList.length > 0});
    header.counter = cart.getItemsCount();
});
events.on('buyer:change', () => {
    const errors = buyer.validateInfo();
    let orderErrors = '';
    if (errors.payment) orderErrors += errors.payment + '\n';
    if (errors.address) orderErrors += errors.address;
    orderForm.render({...buyer.getInfo(), errors: orderErrors, buttonEnabled: !errors.payment && !errors.address});
    let contactsErrors = '';
    if (errors.email) contactsErrors += errors.email + '\n';
    if (errors.phone) contactsErrors += errors.phone;
    contactsForm.render({...buyer.getInfo(), errors: contactsErrors, buttonEnabled: !errors.email && !errors.phone});
});