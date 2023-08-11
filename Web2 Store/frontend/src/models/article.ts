export interface Article{
    id : number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    picture: string;
    salesmanId: number;
   
}

export interface CreateArticle {
    name: string;
    price: number;
    quantity: number;
    description: string;
    picture: string;
    salesmanId: number;
   
}