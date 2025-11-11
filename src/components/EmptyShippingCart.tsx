type EmptyShippingCartProps = {
  empty: boolean
};

function EmptyShippingCartSpace({ empty }: EmptyShippingCartProps) {
  if (empty) {
    return(
      <>
        <div>
          <h6 className="text-lg text-center text-slate-500">Add product to cart</h6>
        </div>
      </>
    );
  }
}

export default EmptyShippingCartSpace;