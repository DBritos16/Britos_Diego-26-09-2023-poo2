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

productRouter.put('/:id', async (req, res)=>{
    const product = await Product.updateProduct(req.params.id, req.body);

    return res.json(product);
});

productRouter.delete('/:id', async (req, res)=>{
    const product = await Product.deleteProduct(req.params.id);

    return res.json(product);
});

export { productRouter }