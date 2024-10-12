export interface IShop {
  id: number;
  name: string;
  time_of_delivery: string;
  stars: number;
  price: number;
  image: string | null;
}

export interface IShopDto {
  name: string;
  time_of_delivery: string;
  stars: number;
  price: number;
  image: string | null;
}
