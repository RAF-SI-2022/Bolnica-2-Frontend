export interface SearchBiochemResponse{
    count:number;
    orderList:Array<OrderListResponse>;
}
export interface OrderListResponse{
    id:number;
    creationTime:Date;
    lbp:string;
    status:StatusResponse;
    lbzTechnician:string;
}
export interface StatusResponse{
    notation:string;
}