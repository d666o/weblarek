import { IApi, IOrder, IResolveOrder, IResponseApi } from "../types";

export class ApiCommunication {
    constructor(private api: IApi) {};

    getProductList(): Promise<IResponseApi> {
        return this.api.get<IResponseApi>('/product/');
    };
    postOrder(item: IOrder): Promise<IResolveOrder> {
        return this.api.post<IResolveOrder>('/order/', item);
    };
};