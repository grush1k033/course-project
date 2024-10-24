
export interface ICar {
    id: number;
    id_mark: number;
    image: string;
    id_model: number;
    id_auto_part: number;
}

export interface IMark {
    id: number;
    name: string;
}

export interface IModel {
    id: number;
    name: string;
    id_model: number;
}

export interface IAutoPart {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category_id: number;
    cars_id: number;
    amount: number;
    discount: number
    favourites: boolean;
}

export interface IBasket {
    id:number;
    autoPart_id:number;
    user_id: number;
}

export interface IBasketDto {
    AutopartId:number;
    UserId: number;
}

export interface ICategory {
    id: number;
    name: string;
    image: string
}