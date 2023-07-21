import { Product } from "./product";

export interface Cart {
    id?: number,
    products: Product [],
    Cart_Total: number
}
