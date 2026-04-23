export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string,
    title: string,
    image: string,
    category: string,
    price: number | null,
    description: string
}

export interface IBuyer {
    payment: 'online' | 'cash' | 'Не выбран вид оплаты',
    email: string,
    phone: string,
    address: string
}

export interface IValidate {
    payment?: string,
    address?: string,
    email?: string,
    phone?: string
}

export interface IResponseApi {
    total: number
    items: IProduct[]
}

export interface IOrder extends IBuyer {
    total: number,
    items: string[]
}

export interface IResolveOrder {
    id: string,
    total: number
}
export interface IRejectOrder {
    error: string
}