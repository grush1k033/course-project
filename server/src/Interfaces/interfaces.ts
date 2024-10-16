
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

export interface AutoPart {
    id: number;
    name: string;
    price: string;
    description: string;
}

export interface ICategory {
    id: number;
    name: string;
    image: string
}