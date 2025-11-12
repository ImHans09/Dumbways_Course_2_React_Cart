import { products, type Product } from "../models/product";

export async function fetchProducts(name: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        (name.length === 0) ? products : (products.filter(product => (product.name).toLowerCase() === name.toLowerCase()))
      )
    }, 1000);
  });
}