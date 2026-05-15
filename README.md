# Проектная работа "Веб-ларек"

https://github.com/d666o/weblarek

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные
Описание интерфейсов и типов для работы с данными

`IProduct` - интерфейс товара.
`IBuyer` - интерфейс покупателя.
`TBuyerErrors` - тип для объекта с ошибками валидации данных покупателя.
`IResponseApi` - интерфейс объекта, возвращаемого Api.
`IOrder` - расширенный интерфейс покупателя для отправки данных.
`IResolveOrder` - интерфейс для ответа Api после успешной отправки данных.

### Модели данных

#### Класс Products
Хранение товаров, которые можно купить в приложении.

Конструктор:
`constructor(events?: IEvents)` может принимать экземпляр брокера событий.

Поля класса:
`list: IProduct[]` - хранит массив всех товаров.
`checkedItem: IProduct | null` - хранит товар, выбранный для подробного отображения.
`events?: IEvents` - хранит экземпляр брокера событий.

Методы класса:
`setList(items: IProduct[]): void` - сохраняет массив товаров.
`getList(): IProduct[]` - возвращает массив товаров.
`getListItem(id: string): IProduct | null` - возвращает товар из массива по его id или `null`, если такого товара нет.
`setCheckedItem(item: IProduct | null): void` - сохраняет товар, выбранный для подробного отображения.
`getCheckedItem(): IProduct | null` - возвращает товар, выбранный для подробного отображения или `null`, если такого товара нет.

#### Класс Cart
Хранение товаров, которые пользователь выбрал для покупки.

Конструктор:
`constructor(events?: IEvents)` может принимать экземпляр брокера событий.

Поля класса:
`list: IProduct[]` - хранит массив товаров, выбранных покупателем для покупки.
`events?: IEvents` - хранит экземпляр брокера событий.

Методы класса:
`getList(): IProduct[]` - возвращает массив товаров, которые находятся в корзине.
`addItem(item: IProduct | null): void` - добавляет товар, который был получен в параметре, в массив корзины.
`removeItem(id: string): void` - удаляет товар по id из массива корзины.
`clearList(): void` - очищает массив корзины.
`getTotalAmount(): number` - возвращает стоимость всех товаров в корзине.
`getItemsCount(): number` - возвращает количество товаров в корзине.
`isExist(id: string): boolean` - проверяет наличие товара в корзине по его id, полученного в параметр метода.

#### Класс Buyer
Хранение данных покупателя, которые тот должен указать при оформлении заказа.

Конструктор:
`constructor(events?: IEvents)` может принимать экземпляр брокера событий.

Поля класса:
`info: IBuyer` - хранит данные покупателя.
`events?: IEvents` - хранит экземпляр брокера событий.

Методы класса:
`setInfo(item: Partial<IBuyer>): void` - сохраняет данные покупателя.
`getInfo(): IBuyer` - возвращает все данные покупателя.
`clearInfo(): void` - очищает данные покупателя.
`validateInfo(): TBuyerErrors` - проверяет корректность внесенный данных. Возвращает объект с полями класса, значениями которых будет текст ошибки, или пустой объект, если данные корректны.

### Слой коммуникации

#### Класс ApiCommunication
Взаимодействие с другими приложениями и хранилищами.
Отвечает за получение и отправку данных.

Конструктор:
`constructor(item: IApi)` - принимает объект для работы с Api.

Методы класса:
`getProductList(): Promise<IResponseApi>` - возвращает массив товаров, полученные из Api.
`postOrder(item: IOrder): Promise<IResolveOrder>` - отправляет данные о покупке и возвращает ответ сервера.

### Слой представления

#### Класс Header
Отображение шапки и иконки количества товаров в корзине, взаимодействие с кнопкой корзины.

Интерфейс:
`IHeader {counter: number}`

Конструктор:  
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Поля класса:
`protected counterElement: HTMLElement` - элемент иконки количества товаров в корзине.
`protected basketButton: HTMLButtonElement` - элемент кнопки корзины.

Методы класса:
`set counter(value: number)` - устанавливает количество товаров в корзине.

#### Класс Gallery
Отображение каталога товаров.

Интерфейс:
`IGallery {catalog: HTMLElement[]}`

Конструктор:
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент.

Поля класса:
`protected catalogElement: HTMLElement` - элемент каталога.

Методы класса:
`set catalog(items: HTMLElement[])` - добавляет товары в каталог.

#### Класс Modal
Отображение модального окна, взаимодействие с кнопкой закрытия.

Интерфейс:
`IModal {content: HTMLElement}`

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Поля класса:
`protected contentElement: HTMLElement` - элемент наполнения модального окна.
`protected buttonElement: HTMLButtonElement` - элемент кнопки закрытия модального окна.

Методы класса:
`set content(item: HTMLElement)` - добавляет контент в модальное окно.
`op(): void` - открывает модальное окно.
`cl(): void` - закрывает модальное окно.

#### Класс Order
Отображение успешной покупки.

Интерфейс:
`IOrder {totalPrice: number}`

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Поля классса:
`protected totalPriceElement: HTMLElement` - элемент, который показывает финальную стоимость покупки.
`protected buttonElement: HTMLButtonElement` - элемент кнопки закрытия.

Методы класса:
`set totalPrice(value: number)` - устанавливает финальную стоимость покупки.

#### Класс Basket
Отображение корзины, взаимодействие с кнопкой оформления покупки.

Интерфейс:
`IBasket {price: number, items: HTMLElement[], buttonEnabled: boolean}`

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Поля класса:
`protected listElement: HTMLElement` - элемент наполнения корзины.
`protected priceElement: HTMLElement` - элемент общей стоимости.
`protected buttonElement: HTMLButtonElement` - элемент кнопки оформления покупки.

Методы класса:
`set price(value: number)` - устанавливает общую стоимость корзины.
`set buttonEnabled(value: boolean)` - устанавливает доступность кнопки оформления покупки. 
`set items(items: HTMLElement[])` - добавляет товары в корзину.

#### Класс Form
Родительский класс для форм оформления заказа.

Интерфейс:
`IForm {errors: string, buttonEnabled: boolean}`

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Поля класса:
`protected submitButtonElement: HTMLButtonElement` - элемент кнопки отправки формы.
`protected errorElement: HTMLElement` - элемент отображения ошибки.
`protected formElement: HTMLFormElement` - элемент формы.
`protected inputElements: HTMLInputElement[]` - массив элементов ввода данных пользователя.

Методы класса:
`set errors(value: string)` - устанавливает ошибки заполнения формы.
`set buttonEnabled(value: boolean)` - устанавливает доступность кнопки отправки формы.

##### Класс OrderForm
Дочерний класс Form, отвечает за отображение первой формы оформления заказа.

Тип:
`TOrderForm = Pick<IBuyer, 'payment' | 'address'>`

Интерфейс:
`IOrderForm extends TOrderForm, IForm {}`

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Поля класса:
`protected onlineButtonElement: HTMLButtonElement` - элемент кнопки оплаты онлайн.
`protected cashButtonElement: HTMLButtonElement` - элемент кнопки оплаты при получении.

Методы класса:
`set payment(value: 'online' | 'cash' | null)` - устанавливает выбранный ранее способ оплаты.
`set address(value: string)` - устанавливает введенный ранее адрес.

##### Класс ContactsForm
Дочерний класс Form, отвечает за отображение второй формы оформления заказа.

Тип:
`TContactsForm = Pick<IBuyer, 'phone' | 'email'>`

Интерфейс:
`IContactsForm extends TContactsForm, IForm {}`

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` - принимает экземпляр брокера событий и ссылку на DOM элемент.

Методы класса:
`set phone(value: string)` - устанавливает введенный ранее номер телефона.
`set email(value: string)` - устанавливает введенный ранее адрес электронной почты.

#### Класс Card
Родительский класс для карточек товаров.

Конструктор:
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент.

Поля класса:
`protected titleElement: HTMLElement` - элемент названия товара.
`protected priceElement: HTMLElement` - элемент цены товара.

Методы класса:
`set title(value: string)` - устанавливает название товара.
`set price(value: number | null)` - устанавливает цену товара.

##### Класс CardGallery
Дочерний класс Card, отвечает за отображение карточки в каталоге.

Интерфейс:
`ICardGallery extends ICard {category: string, image: string}`
`ICardGalleryActions {selectCardHandler: () => void}`

Конструктор:
`constructor(container: HTMLElement, actions?: ICardGalleryActions)` - принимает ссылку на DOM элемент и также может принимать функцию обработчик клика.

Поля класса:
`protected categoryElement: HTMLElement` - элемент категории товара.
`protected imageElement: HTMLImageElement` - элемент картинки товара.
`protected buttonElement: HTMLButtonElement` - элемент кнопки товара.

Методы класса:
`set category(value: string)` - устанавливает категорию товара.
`set image(value: string)` - устанавливает картинку товара.

##### Класс CardPreview
Дочерний класс Card, отвечает за отображение выбранной карточки в модальном окне.

Интерфейс:
`ICardPreview extends ICard {category: string, image: string, description: string}`
`ICardPreviewActions {buttonHandler: () => void}`

Конструктор:
`constructor(container: HTMLElement, actions?: ICardPreviewActions)` - принимает ссылку на DOM элемент.

Поля класса:
`protected categoryElement: HTMLElement` - элемент категории товара.
`protected imageElement: HTMLImageElement` - элемент картинки товара.
`protected textElement: HTMLElement` - элемент описания товара.
`protected buttonElement: HTMLElement` - элемент кнопки товара.

Методы класса:
`set category(value: string)` - устанавливает категорию товара.
`set image(value: string)` - устанавливает картинку товара.
`set description(value: string)` - устанавливает описание товара.
`setButton(value: string, disabled: boolean, onClick?: () => void): void` - устанавливает кнопку карточки товара.

##### Класс CardBasket
Дочерний класс Card, отвечает за отображение добавленных товаров в корзину.

Интерфейс:
`ICardBasket extends ICard {index: number}`
`ICardBasketActions {removeItem: () => void}`

Конструктор:
`constructor(container: HTMLElement, actions?: ICardBasketActions)` - принимает ссылку на DOM элемент и также может принимать функцию обработчик клика.

Поля класса:
`protected indexElement: HTMLElement` - элемент индекса товара.
`protected buttonElement: HTMLButtonElement` - элемент кнопки товара.

Методы класса:
`set index(value: number)` - устанавливает индекс товара.

### События

`basket:remove` - удаляет товар из корзины.
`basket:add` - добавляет товар в корзину.
`basket:open` - открывает корзину.
`basket:order` - закрывает корзину и открывает первую форму оформления заказа.
`order:change` - сохранение данных о покупателе при изменении первой формы оформления заказа.
`order:submit` - закрывает первую форму и открывает вторую.
`contacts:change` - сохранение данных о покупателе при изменении второй формы оформления заказа.
`contacts:submit` - закрывает вторую форму, отправляет данные о покупке на сервер, очищает информацию о покупателе, открывает модальное окно успешной покупки.
`order:close` - закрывает модальное окно успешной покупки.
`card:select` - устанавливает выбранный в каталоге товар.
`products:change` - обновляет карточки в каталоге при изменении в моделе.
`checkedProduct:change` - открывает модальное окно с подробным просмотром товара.
`cart:change` - обновляет счетчик товаров на кнопке корзины.
`buyer:change` - проводит валидацию введенных в формы данных, выводит ошибки заполнения.

### Презентер

Презентер реализован в файле `main.ts`.