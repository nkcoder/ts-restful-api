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
