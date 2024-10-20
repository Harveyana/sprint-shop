import React from "react";

import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import useToast from "../hooks/useToast";

interface Product  {
  id: number;
  title:string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating:{rate: number, count: number}

}

const SearchProduct = (product:Product,key:string|number) => {

  const navigate = useNavigate();

  const handleNavigateToProduct = (productId:number) => {
    navigate(`/product/${productId}`);
  };

  const {handleAddToCart} = useCart()
  const {notify} = useToast()

  const onAddTocart=()=>{
    handleAddToCart({
      id:product?.id,
      name:product?.title,
      image: product?.image,
      quantity: 1,
      price: product?.price,
      category: product?.category
    })
    notify('Added to cart successfully')
  }

  return (
   
        <div
          key={key}
          className={`flex items-center hover:bg-[#F8FAFC] justify-start w-full relative cursor-pointer bg-white`}
        >
          <div onClick={() => handleNavigateToProduct(product.id)} className="w-[35%] rounded-2xl flex justify-center items-center">
            <img className="w-[25%] bg-[#F8FAFC]" src={product.image} />
          </div>
          
          <div onClick={() => handleNavigateToProduct(product.id)} className="w-[60%] flex justify-between items-start my-3 flex-col px-2">
            <span className="w-[60%] flex flex-col justify-between  items-start">
              <h1 className="w-full max-h-[20%] text-[12px] font-semibold truncate text-ellipsis overflow-hidden">
                {product.title}
              </h1>
              <h2 className="font-semibold text-[12px] whitespace-nowrap  lg:text-[14px]">₦ {product.price}</h2>
            </span>
            
          </div>
          <button onClick={()=>onAddTocart()} className="w-[25px] absolute top-3 right-6 rounded-full">
            <svg width="40" height="40" className="hover:bg-black p-0.5 rounded-full" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="white"/>
              <g clipPath="url(#clip0_2002_2306)">
              <path d="M15.3332 17.3333C15.7014 17.3333 15.9998 17.6318 15.9998 18C15.9998 19.1045 16.8953 20 17.9998 20C19.1044 20 19.9998 19.1045 19.9998 18C19.9998 17.6318 20.2983 17.3333 20.6665 17.3333C21.0347 17.3333 21.3332 17.6318 21.3332 18C21.3332 19.8409 19.8408 21.3333 17.9998 21.3333C16.1589 21.3333 14.6665 19.8409 14.6665 18C14.6665 17.6318 14.965 17.3333 15.3332 17.3333Z" fill="#4B5563"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M21.3333 14.6667H22.7585C23.8078 14.6667 24.6787 15.4776 24.7534 16.5242L25.1276 21.7625C25.2654 23.6921 23.7372 25.3334 21.8027 25.3334H14.1973C12.2628 25.3334 10.7346 23.6921 10.8724 21.7625L11.2466 16.5242C11.3213 15.4776 12.1922 14.6667 13.2415 14.6667H14.6667V14C14.6667 12.1591 16.1591 10.6667 18 10.6667C19.8409 10.6667 21.3333 12.1591 21.3333 14V14.6667ZM16 14.6667H20V14C20 12.8955 19.1046 12 18 12C16.8954 12 16 12.8955 16 14V14.6667ZM13.2415 16C12.8917 16 12.6014 16.2703 12.5765 16.6192L12.2024 21.8575C12.1197 23.0153 13.0366 24 14.1973 24H21.8027C22.9634 24 23.8803 23.0153 23.7977 21.8575L23.4235 16.6192C23.3986 16.2703 23.1083 16 22.7585 16H13.2415Z" fill="#4B5563"/>
              </g>
              <defs>
              <clipPath id="clip0_2002_2306">
              <rect width="16" height="16" fill="white" transform="translate(10 10)"/>
              </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      
  );
};

export default SearchProduct;
