import { Router } from 'express';
import { ProductService } from './product.service';

const productRouter = Router();

const Product = new ProductService();

productRouter.get('/', async (req, res)=>{
   const products = await Product.getProducts();

   return res.json(products)

});

productRouter.get('/:id', async (req, res)=>{
    const product = await Product.getProduct(req.params.id);

    return res.json(product);
});


 productRouter.post('/', async (req, res)=>{
    const product = await Product.createProduct(req.body);

    return res.json(product);
});

productRouter.patch('/', (req, res)=>{
    const product = Product.updateStockProduct(req.body.id, req.body.stock);

    return res.json(product);
});

productRouter.delete('/', (req, res)=>{
    const product = Product.deleteProduct(req.body.id);

    return res.json(product);
});

export { productRouter }