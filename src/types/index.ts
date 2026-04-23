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

type TPayment = 'online' | 'cash'

export interface IBuyer {
    payment: TPayment | null,
    email: string,
    phone: string,
    address: string
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>

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