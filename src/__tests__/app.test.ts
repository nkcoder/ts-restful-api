import request from "supertest";
import { server } from "../server";

beforeAll((done) => {
  server.on('listening', done);
});

afterAll((done) => {
  server.close(done);
});


describe('POST /products', () => {
  it('should create a new product', async () => {
    const product = {
      id: 1,
      name: 'Product Name',
      description: 'Product Description',
      brand: 'Product Brand',
      country_id: 1,
    };

    const response = await request(server).post('/products').send(product);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(product);
  });

  it('should return an error if request payload is invalid', async () => {
    const invalidProduct = {
      name: 'Invalid Product',
      description: 'Invalid Description',
      brand: 'Invalid Brand',
      country_id: 1
    };

    const response = await request(server).post('/products').send(invalidProduct);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /products/:id', () => {
  it('should retrieve an existing product', async () => {

    // create a product first
    const product = {
      id: 1,
      name: 'Product Name',
      description: 'Product Description',
      brand: 'Product Brand',
      country_id: 1,
    };

    const createResponse = await request(server).post('/products').send(product);
    expect(createResponse.status).toBe(201);
    expect(createResponse.body.id).toBe(1);

    // then retrieve the product
    const productId = 1;
    const getResponse = await request(server).get(`/products/${productId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(productId);
  });

  it('should return an error if product does not exist', async () => {
    const nonExistentProductId = '100';

    const response = await request(server).get(`/products/${nonExistentProductId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
