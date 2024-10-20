import React from "react";

import Product from "./Product";

import { useProducts } from "../contexts/ProductsContext";

import { useNavigate } from "react-router-dom";

interface Product  {
  id: number;
  title:string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating:{rate: number, count: number}

}

const Products = () => {

  const {products} = useProducts()

  if(!products.length){
    return(
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-[12px] whitespace-nowrap text-[20px]">No Products Found</h1>
      </div>
    )
  }


  return (
    <div className="h-[70vh] w-full overflow-y-auto overflow-x-hidden ">
      <div className="w-full flex justify-center lg:items-start flex-wrap lg:justify-start my-3 gap-x-1 gap-y-2 lg:gap-10">
        {products.map((product:Product) => (
        <Product 
          key={product.id + product.title}
          id={product.id}
          title={product.title}
          price={product.price}
          category={product.category}
          description={product.description}
          rating={product.rating}
          image={product.image}
        />
        ))}
      </div>
    </div>
    
  ); 
};

export default Products;
