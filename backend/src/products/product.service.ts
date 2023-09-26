import { Product } from './product.entity';
import { ProductModel } from './product.model';

export class ProductService {

    model = ProductModel;

    getProducts(): Promise<Product[]> {
        return this.model.findAll();
    }

    getProduct(id: string): Promise<Product | null> {
        return this.model.findByPk(id);
    }

    createProduct(product: Product): Promise<Product> {
        return this.model.create(product);
    }

    updateStockProduct(id: string, stock: number): Promise<number[]>{
         return this.model.update({ stock }, { where: { id } });
    }

    deleteProduct(id: string): Promise<number> {
        return this.model.destroy({ where: { id } });
    }
};