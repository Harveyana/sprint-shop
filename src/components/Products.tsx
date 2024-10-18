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


  return (
    <div className="h-[70vh] w-full overflow-y-auto overflow-x-hidden ">
      <div className="w-full flex justify-center lg:items-start flex-wrap lg:justify-start my-3 gap-x-1 gap-y-2 lg:gap-10">
        {products.map((product:Product) => (
        <Product 
          key={product.id}
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
