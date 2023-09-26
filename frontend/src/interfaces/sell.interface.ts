import { Product } from "./product.interface";

export interface Sell {
    id: number;
    tipo: string;
    cantidad: number;
    fecha: string;
    total: number;
    productId: number;
    ProductModel: Product;
    }