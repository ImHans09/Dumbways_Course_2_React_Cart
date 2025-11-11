import { useState } from 'react';
import './App.css';
import ProductItemCard from './components/ProductCard';
import ProductItemBar from './components/ProductBar';
import EmptyShippingCartSpace from './components/EmptyShippingCart';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Book', price: 10000.00, quantity: 0 },
    { id: 2, name: 'Pen', price: 3000.00, quantity: 0 },
    { id: 3, name: 'Ruler', price: 5000.00, quantity: 0 },
  ]);
  const updateProductQuantity = (id: number, quantity: number) => {
    setProducts(products => products.map(
      product => product.id === id ? { ...product, quantity: quantity } : product
    ))
  };
  const emptyProducts = products.filter(product => product.quantity > 0).length

  return (
    <div className='w-full max-w-6xl max-h-full flex flex-col gap-6 py-8 px-6'>
      <h1 className='text-6xl font-bold text-slate-900'>Store</h1>
      <div className='flex flex-row space-x-4'>
        {/* Left side */}
        <div className='flex-1 space-y-4 py-4'>
          <h4 className='text-2xl font-semibold text-slate-900'>Product List</h4>
          <ul className='flex flex-col gap-4'>
            {products.map(product => (
              <li>
                <ProductItemCard 
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  onAddClick={() => {
                    updateProductQuantity(product.id, product.quantity += 1);
                  }}
                  onMinusClick={() => {
                    updateProductQuantity(product.id, product.quantity -= 1);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right side */}
        <div className='flex-1'>
          <div className='flex flex-col space-y-3 px-6 py-4 rounded-lg bg-slate-100'>
            <div className='flex flex-row gap-2 items-center text-slate-900'>
              <h4 className='text-2xl font-semibold'>Shipping Cart</h4>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div className='flex flex-col gap-4'>
              <EmptyShippingCartSpace 
                empty={emptyProducts === 0}
              />
              <ul className='flex flex-col gap-2'>
                {products.map(product =>
                  {if (product.quantity > 0) {
                    return(
                      <li>
                        <ProductItemBar
                          name={product.name}
                          price={(product.price) * (product.quantity)}
                          quantity={product.quantity}
                        />
                      </li>
                    )
                  }}
                )}
              </ul>
              <button className='mt-1 py-2 text-slate-100 hover:text-slate-200 bg-green-500 hover:bg-green-600 border-0 focus:outline-none transition-colors ease-in-out delay-50'>
                <span>Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
