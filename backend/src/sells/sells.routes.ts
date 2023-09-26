import { Router } from "express";
import { SellService } from "./sell.service";
import { ProductService } from "../products/product.service";
import { Product } from "../products/product.entity";

const sellRouter = Router();

const Sell = new SellService();
const Product = new ProductService();

sellRouter.get('/', async (req, res) => {
  const sells = await Sell.getSells();
  res.json(sells);
});

sellRouter.post('/', async (req, res) => {
  const product = await Product.getProduct(req.body.productId);

  // @ts-ignore
  const sell = await Sell.postSell(req.body, product);
  res.json(sell);
});

sellRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const infoSell = await Sell.getSell(req.params.id);
  
  // @ts-ignore
  const sell = await Sell.cancelSell(id, infoSell);
  
  res.json(sell);
});


export { sellRouter };