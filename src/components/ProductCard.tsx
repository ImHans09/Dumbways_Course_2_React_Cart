type AddButtonProps = {
  quantity: number,
  onClick: () => void
};

type ProductItemProps = {
  name: string,
  price: number,
  quantity: number,
  onAddClick: () => void,
  onMinusClick: () => void
};

function AddButton({ quantity, onClick }: AddButtonProps) {
  if (quantity < 20) {
    return(
      <>
        <button onClick={onClick} type='button' className='w-fit p-2 rounded-full text-slate-500 border-0 focus:outline-none ring-1 ring-inset ring-slate-500 bg-transparent hover:bg-slate-200 transition-colors ease-in-out delay-50'>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
          </svg>
        </button>
      </>
    )
  } else {
    return(
      <>
        <button disabled type='button' className='w-fit p-2 rounded-full text-slate-500 border-0 focus:outline-none ring-1 ring-inset ring-slate-500 bg-transparent hover:bg-slate-200 transition-colors ease-in-out delay-50'>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
          </svg>
        </button>
      </>
    )
  }
}

function ProductItemCard({ name, price, quantity, onAddClick, onMinusClick }: ProductItemProps) {
  return(
    <>
      {/* Product Card */}
      <div className='py-3 px-5 rounded-md ring-1 ring-inset ring-slate-300 bg-slate-100'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row items-center justify-between'>
            <h6 className='text-3xl font-semibold text-slate-900'>{name}</h6>
            <span className='text-xl font-semibold text-green-500'>Rp {price}</span>
          </div>
          <p className='text-justify text-slate-900 line-clamp-3 pr-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolor magni esse tempore quod asperiores consequatur, delectus officia temporibus id. Ut sequi aliquid dicta, voluptas dolorum animi quisquam officiis cupiditate.</p>
          {quantity === 0 ? (
            <div className='mt-6 flex justify-end'>
              <button onClick={onAddClick} type='button' className='w-fit flex flex-row items-center justify-center px-3 py-2 gap-2 text-slate-100 hover:text-slate-200 bg-blue-600 hover:bg-blue-700 border-0 focus:outline-none transition-colors ease-in-out delay-50'>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
                </svg>
                <span>Add to cart</span>
              </button>
            </div>
          ) : (
            <div className='mt-6 flex flex-row gap-2 items-center justify-end'>
              <button onClick={onMinusClick} type='button' className='w-fit p-2 rounded-full text-slate-500 border-0 focus:outline-none ring-1 ring-inset ring-slate-500 bg-transparent hover:bg-slate-200 transition-colors ease-in-out delay-50'>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                </svg>
              </button>
              <div className='py-1.5 px-5 rounded-md bg-transparent ring-1 ring-inset ring-slate-500'>
                <span className='text-lg text-slate-700'>{quantity}</span>
              </div>
              <AddButton
                quantity={quantity}
                onClick={onAddClick}
              />
            </div>
          )}
        </div>
      </div>
      {/* End Product Card */}
    </>
  );
}

export default ProductItemCard;