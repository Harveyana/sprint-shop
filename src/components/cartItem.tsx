import React,{useState} from "react";
import { useCart } from "../contexts/CartContext";

import useToast from "../hooks/useToast"

interface Product  {
  id: number;
  name:string;
  quantity:number;
  price: number;
  image: string;
}

const CartItem = (product:Product) => {

  const [quantity, setQuantity] = useState(product.quantity)
  const {handleAddToCart,cart,totalPriceCost,handleDeleteFromCart,increaseQuantity,decreaseQuantity} = useCart()



  const {notify} = useToast()

  const handleDelete = (id:number)=>{
    handleDeleteFromCart(id)
    notify('Item removed successfully')
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev:number)=> prev - 1);
      decreaseQuantity(product.id)
    }else{
      handleDelete(product.id)
    }

  };

  const handleIncrement = () => {
    setQuantity((prev:number) => prev + 1);
    increaseQuantity(product.id)
  };

 

  return (
   
    <div
    key={product.id}
    className={`pt-4 flex relative flex-row gap-2 sm:gap-3 text-secondary w-full relative cursor-pointer bg-white border-top border-t border-gray-200`}
    >
      <div className="w-[30%] sm:w-[15%] p-5 rounded-2xl bg-[#F8FAFC] flex justify-center items-center">
        <img className="w-full bg-[#F8FAFC]" src={product.image} />
      </div>

      <div className=" flex items-start flex-col gap-y-2 px-2">
        <h1 className="text-black max-w-[80%] text-[10px] lg:text-[14px] font-semibold text-wrap text-ellipsis overflow-hidden">
          {product.name}
        </h1>

        <h2 className="font-semibold text-[12px] whitespace-nowrap  lg:text-[14px]">x {quantity}</h2>

        
        <div className="w-full flex items-center gap-x-3 justify-between">
            <div className="w-fit px-4 py-2 bg-[#F8F8F8] rounded-full flex gap-x-3 items-center justify-center">
              {/* decrease quantity */}
              <button id="decrease" onClick={()=> handleDecrement()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.5">
                  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E5E7EB"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.8674 7.04789 11.7402 7.13313 11.6464C7.21838 11.5527 7.33399 11.5 7.45455 11.5H16.5455C16.666 11.5 16.7816 11.5527 16.8669 11.6464C16.9521 11.7402 17 11.8674 17 12C17 12.1326 16.9521 12.2598 16.8669 12.3536C16.7816 12.4473 16.666 12.5 16.5455 12.5H7.45455C7.33399 12.5 7.21838 12.4473 7.13313 12.3536C7.04789 12.2598 7 12.1326 7 12Z" fill="#111827"/>
                  </g>
                </svg>
              </button>

              <p className="text-[#666666] text-[14px] lg:text-[16px]">{quantity}</p>
              {/* increase quantity */}
              <button id="increase" onClick={()=> handleIncrement()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E5E7EB"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.1206 7 12.2362 7.04789 12.3214 7.13313C12.4067 7.21838 12.4545 7.33399 12.4545 7.45455V11.5455H16.5455C16.666 11.5455 16.7816 11.5933 16.8669 11.6786C16.9521 11.7638 17 11.8794 17 12C17 12.1206 16.9521 12.2362 16.8669 12.3214C16.7816 12.4067 16.666 12.4545 16.5455 12.4545H12.4545V16.5455C12.4545 16.666 12.4067 16.7816 12.3214 16.8669C12.2362 16.9521 12.1206 17 12 17C11.8794 17 11.7638 16.9521 11.6786 16.8669C11.5933 16.7816 11.5455 16.666 11.5455 16.5455V12.4545H7.45455C7.33399 12.4545 7.21838 12.4067 7.13313 12.3214C7.04789 12.2362 7 12.1206 7 12C7 11.8794 7.04789 11.7638 7.13313 11.6786C7.21838 11.5933 7.33399 11.5455 7.45455 11.5455H11.5455V7.45455C11.5455 7.33399 11.5933 7.21838 11.6786 7.13313C11.7638 7.04789 11.8794 7 12 7Z" fill="#111827"/>
                </svg>
              </button>

            </div>



        </div>
        
      </div>

      <h2 className="absolute right-3 top-[50%] my-auto font-semibold text-[12px] whitespace-nowrap  lg:text-[14px]">₦ {product.price}</h2>
      {/* delete product */}
      <button id="delete" onClick={()=>handleDelete(product.id)}  className=" absolute right-3 top-3 rounded-full border border-gray-200 px-1 py-0.3 sm:py-1 hover:bg-gray-400">
       <svg className="w-3 sm:w-10" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="black" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
      </button>

    </div>
      
  );
};

export default CartItem;
