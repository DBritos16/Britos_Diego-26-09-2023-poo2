import express from 'express';
import cors from 'cors';
import { productRouter } from './products/product.routes';
import { connectDB } from './database/database';
import { sellRouter } from './sells/sells.routes';

export function startServer () {

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/products', productRouter);
  app.use('/sells', sellRouter);

  app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
  });

  return app;
}
