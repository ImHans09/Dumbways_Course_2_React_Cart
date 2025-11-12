import './App.css';
import React, { useEffect, useState } from 'react';
import ProductItemCard from './components/ProductCard';
import ProductItemBar from './components/ProductBar';
import EmptyShippingCartSpace from './components/EmptyShippingCart';
import { products, type Product } from './models/product';
import { useDebounce } from './hooks/debounce';
import { fetchProducts } from './api/product-api';

function App() {
  const [_, setDummyProducts] = useState(products);
  const emptyProductsLength = products.filter(product => product.quantity > 0).length;
  const updateProductQuantity = (id: number, quantity: number) => {
    setDummyProducts(products => products.map(
      product => product.id === id ? { ...product, quantity: quantity } : product
    ))
  };
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<Product[]>(products);
  const [name, setName] = useState('');
  const debounceName = useDebounce(name, 500);
  const handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  useEffect(() => {
    setLoading(true);
    fetchProducts(debounceName).then((products) => setProductsData(products)).finally(() => setLoading(false));
  }, [debounceName]);

  return (
    <div className='w-full max-w-6xl max-h-full flex flex-col gap-6 py-8 px-6'>
      <h1 className='text-6xl font-bold text-slate-900'>Store</h1>
      <div className='flex flex-row space-x-4'>
        {/* Left side */}
        <div className='flex-1 flex-col py-4'>
          <div className='mb-8 flex flex-row items-center justify-between'>
            <h4 className='text-2xl font-semibold text-slate-900'>Product List</h4>
            <div className='flex flex-row rounded-md items-center gap-2 pl-3 pr-4 ring-1 ring-inset ring-slate-400 focus:ring-slate-700 bg-slate-50'>
              <svg className="w-5 h-5 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
              <input className='py-1.5 text-slate-900 placeholder-slate-400 bg-transparent ring-0 focus:outline-none' type="text" placeholder='Type product name' value={name} onChange={handleOnNameChange} />
            </div>
          </div>
          {loading && 
            <div className='min-h-md flex flex-col gap-2 items-center justify-center text-slate-500'>
              <svg className="w-16 h-16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/>
              </svg>
              <span className='text-lg'>Loading</span>
            </div>
          }
          {!loading && 
            <ul className='space-y-4'>
              {productsData.map((productData) => 
                <li>
                  <ProductItemCard 
                    name={productData.name}
                    price={productData.price}
                    quantity={productData.quantity}
                    onAddClick={() => updateProductQuantity(productData.id, (productData.quantity) += 1)}
                    onMinusClick={() => updateProductQuantity(productData.id, (productData.quantity) -= 1)}
                  />
                </li>
              )}
            </ul>
          }
          {productsData.length === 0 && !loading &&
            <div className='min-h-md flex flex-col gap-2 items-center justify-center text-slate-500'>
              <svg className="w-16 h-16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
              </svg>
              <span className='text-lg'>Product not found</span>
            </div>
          }
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
                empty={emptyProductsLength === 0}
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
