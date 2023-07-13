import express, { Request, Response } from "express";
import { Product } from "./product";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const products: Product[] = [];

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/products", (req: Request, res: Response) => {
  // the request body will be parsed by the `body-parser` middleware
  console.log(`request body = ${JSON.stringify(req.body)}`);
  const { id, name, description, brand, country_id } = req.body;
  if (id === undefined || name.length === 0 || country_id === undefined) {
    console.error("Invalid product payload");
    res.status(400).json({ error: "Invalid product payload" });
  }

  const newProduct: Product = { id, name, description, brand, country_id };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/products/:id", (req: Request, res: Response) => {
  console.log(`try to get product by id: ${req.params.id}`);
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found." });
  }
});

export { app };
