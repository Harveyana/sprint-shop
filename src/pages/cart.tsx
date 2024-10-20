import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";
import Spinner from "../components/Spinner";
import Recommended from "../components/Recommended";
import CartItem from "../components/cartItem";

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
}

const Cart = () => {
  // const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading ] = useState(false)
  const { fetchProductById} = useProducts()
  const {handleAddToCart,cart,totalPriceCost,handleDeleteFromCart} = useCart()

  console.log(cart)

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity((prev)=> prev - 1);
  //   }
  // };

  // const handleIncrement = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const onAddTocart=()=>{
  //   handleAddToCart({
  //     id:product?.id,
  //     name:product?.title,
  //     image:product?.image,
  //     quantity:quantity,
  //     price:product?.price,
  //     category:product?.category
  //    }
  //   )
  // }
 

  // useEffect(() => {
  //   const getProduct = async()=>{
  //     setLoading(true)
  //     const data = await fetchProductById(id)
  //     console.log(data)
  //     setProduct(data)
  //     setLoading(false)
  //   }

  //   getProduct()
  // }, []);

  if(loading){
    return(
      <div>
        <Spinner/>
      </div>
    )
  }

  if(!cart.length){
    return(
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-[12px] whitespace-nowrap text-[20px]">No Product In Cart</h1>
      </div>
    )
  }

  return (
    <div className="w-full  lg:w-[70%] flex flex-col items-start justify-center gap-y-3 px-4 sm:px-8 mt-4">


      {cart.map((product:CartItem) => (

        <CartItem
          key={product.id + product.name}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          quantity={product.quantity}
        />
      
      ))} 

    <div className="w-full flex flex-col items-center py-10">
      <span className="w-full flex items-center justify-between px-2 py-4">
        <h2 className="text-[#4B5563] text-[12px] whitespace-nowrap  lg:text-[14px]">Subtotal</h2>
        <h2 className="text-[#4B5563] text-[12px] whitespace-nowrap  lg:text-[14px]">₦ {Math.floor(totalPriceCost)}</h2>
      </span>

      <span className="w-full flex items-center justify-between px-2 py-4">
        <h2 className="font-semibold text-[12px] whitespace-nowrap  lg:text-[14px]">Order total</h2>
        <h2 className="font-semibold text-[12px] whitespace-nowrap  lg:text-[14px]">₦ {Math.floor(totalPriceCost)}</h2>
      </span>
      <button className="w-full flex items-center rounded-full justify-center bg-[#111827] gap-x-2 p-4 px-4">
        <p className="text-[#FFFFFF] text-[14px] lg:text-[16px] whitespace-nowrap">Confirm order</p>
      </button>
    </div>
        
      
    </div>


  );
};

export default Cart;
