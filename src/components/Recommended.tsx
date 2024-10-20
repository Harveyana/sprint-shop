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

const Recommended = () => {

  const {products} = useProducts()


  return (
    <div className="flex flex-col items-start">
      <h1 className="text-2xl text-left font-bold mb-4">Recommended</h1>
      
      <div className=" w-full h-fit overflow-x-auto overflow-y-hidden">

        <div className="w-fit h-fit flex justify-center gap-4 lg:gap-8">
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
    </div>
    
  ); 
};

export default Recommended;
