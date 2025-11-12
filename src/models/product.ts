export interface Product {
  id: number,
  name: string,
  price: number,
  quantity: number
};

export const products: Product[] = [
    { id: 1, name: 'Book', price: 10000.00, quantity: 0 },
    { id: 2, name: 'Pen', price: 3000.00, quantity: 0 },
    { id: 3, name: 'Ruler', price: 5000.00, quantity: 0 },
  ];