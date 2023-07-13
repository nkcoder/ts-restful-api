import express, { Request, Response } from "express";
import { Product } from "./product";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const port = 3000;

const products: Product[] = [];

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/products", (req: Request, res: Response) => {
  // the request body will be parsed by the `body-parser` middleware
  console.log(`request body = ${JSON.stringify(req.body)}`);
  const { id, name, description, brand, country_id } = req.body;
  const newProduct: Product = { id, name, description, brand, country_id };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/products/:id', (req: Request, res: Response) => {
  console.log(`try to get product by id: ${req.params.id}`);
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({error: 'Product not found.'});
  }
});
