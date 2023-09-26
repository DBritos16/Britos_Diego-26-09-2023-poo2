import { Product } from "../products/product.entity";
import { ProductModel } from "../products/product.model";
import { Sell } from "./sell.entity";
import { SellModel } from "./sell.model";


export class SellService {

    model = SellModel;
    productModel = ProductModel;

    getSells(): Promise<Sell[]>{
        return this.model.findAll({
            include: [ProductModel]
        });
    }
    
    getSell(id: string): Promise<Sell | null>{
        return this.model.findByPk(id, {
            include: [ProductModel]
        });
    }


    postSell(sell: Sell, product: Product): Promise<Sell>{
        const { tipo } = sell;
        console.log(tipo);
        
        switch (tipo) {
            case "Unidad":
                this.productModel.update({stock: product.stock - sell.cantidad}, {where: {id: product.id}});
                break;
            default:
            case "Caja":
                this.productModel.update({stock: product.stock - (10 * sell.cantidad)}, {where: {id: product.id}});
                break;
        }
        
        return this.model.create(sell);
    }

        cancelSell(id: number, infoSell : Sell): Promise<Sell | number>{
            // @ts-ignore
            this.productModel.update({stock: infoSell.ProductModel.stock+infoSell.cantidad}, {where: {id: infoSell.productId}});
        
        return this.model.destroy({where: {id}});
    }

}