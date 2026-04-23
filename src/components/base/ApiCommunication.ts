import { IApi, IOrder, IRejectOrder, IResolveOrder, IResponseApi } from "../../types";

export class ApiCommunication {
    constructor(private api: IApi) {};

    getProductList(): Promise<IResponseApi> {
        return this.api.get<IResponseApi>('/product/');
    };
    postOrder(item: IOrder): Promise<IResolveOrder | IRejectOrder> {
        return this.api.post<IResolveOrder | IRejectOrder>('/order', item);
    };
};