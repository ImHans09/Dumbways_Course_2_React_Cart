type ProductItemProps = {
  name: string,
  price: number,
  quantity: number
};

function ProductItemBar({ name, price, quantity }: ProductItemProps) {
  return(
    <>
      {/* Product Bar */}
        <div className='flex flex-row px-3 py-2 rounded-md items-center justify-between ring-1 ring-inset ring-slate-300'>
          <div className='flex flex-col text-slate-900'>
            <h6 className='text-xl font-semibold'>{name}</h6>
            <span className='text-sm'>Quantity: {quantity}</span>
          </div>
          <h5 className='text-xl font-semibold text-green-500'>Rp {price}</h5>
        </div>
      {/* End Product Bar */}
    </>
  );
}

export default ProductItemBar;