import { Api } from './components/base/Api';
import { ApiCommunication } from './components/ApiCommunication';
import { Buyer } from './components/Models/Buyer';
import { Cart } from './components/Models/Cart';
import { Products } from './components/Models/Product';
import './scss/styles.scss';
import { IBuyer } from './types';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

// Products test
const productsModel = new Products();
const id = "854cef69-976d-4c2a-a18c-2aa45046c390!";
console.log('class Products tests: ');
productsModel.setList(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getList());
console.log('Товар из каталога по id: ', productsModel.getListItem(id));
productsModel.setCheckedItem(productsModel.getListItem(id));
console.log('Выбранный товар из каталога: ', productsModel.getCheckedItem());
console.log('---');

// Cart test
const cartModel = new Cart();
console.log('class Cart tests: ');
cartModel.addItem(productsModel.getCheckedItem());
console.log('Массив товаров в корзине: ', cartModel.getList());
cartModel.removeItem(id);
cartModel.clearList();
console.log('Общая стоимость товаров в корзине: ', cartModel.getTotalAmount());
console.log('Количество товаров в корзине', cartModel.getItemsCount());
console.log('Проверка нахождения товара в корзине: ', cartModel.isExist(id));
console.log('---');

// Buyer test
const buyerModel = new Buyer();
const info: IBuyer = {
    payment: 'online',
    address: '143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44',
    email: 'test@test.com',
    phone: '+7 (900) 554-44-00'
};
console.log('class Buyer tests: ');
console.log('Валидация некорректных данных, введенных покупателем: ', buyerModel.validateInfo())
buyerModel.setInfo(info);
console.log('Сохраненные данные покупателя: ', buyerModel.getInfo());
console.log('Валидация введенных покупателем данных: ', buyerModel.validateInfo());
buyerModel.clearInfo();
console.log('---');

// ApiCommunication test
const api = new Api(API_URL);
const apiService = new ApiCommunication(api);
const test = async () => {
    try {
        const res = await apiService.getProductList();
        productsModel.setList(res.items);
        console.log('Массив товаров из каталога, полученный через api: ', productsModel.getList());
    } catch (e: any) {
        console.log(e);
    };
};
test();